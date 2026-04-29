import {
  ContributionsPageContributionsDocument,
  ContributionsPageContributionsQuery,
  Crag,
} from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";
import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import getCurrentUser from "@/lib/auth/get-current-user";
import ContributionsGroup from "./components/contributions-group";

async function ContributionsPage() {
  const contributionsDataPromise = gqlRequest(
    ContributionsPageContributionsDocument,
    {}
  );

  const {
    data: { contributions },
  } = await contributionsDataPromise;

  const currentUser = await getCurrentUser();

  const contributionsGroups = groupContributions(contributions);

  return (
    <>
      <ContentHeader
        heading="Odprti prispevki"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Odprti prispevki", link: null },
            ]}
          />
        }
      />

      <div className="mx-auto 2xl:container px-4 xs:px-8">
        {Object.values(contributionsGroups).map((group) => (
          <ContributionsGroup
            key={group.crag?.id}
            contributionsGroup={group}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
}

type TContributionsGroup = {
  crag: TContributionsGroupCrag;
  childContributions: TChildContributionsGroup;
};

type TContributionsGroupCrag = {
  id: Crag["id"];
  name: Crag["name"];
  slug: Crag["slug"];
  publishStatus: Crag["publishStatus"];
};

type TChildContributionsGroup = { [key: string]: TContribution[] };

type TContribution =
  ContributionsPageContributionsQuery["contributions"][number];

/*
  Organize all contributions.
  On the topmost level they are grouped by crag. A crag may itself be a contribution.
  Directly under each crag there are groups of sectors and groups of routes. The groups are determined by the contributor, entity type (sectors or routes) and publish status (draft or in_review).
  Groups are structured as an object where first level keys are crag ids and values have the shape of TContributionsGroup.
  Inside TContributionsGroup there is a childContributions object where keys are formed as cragId-contributorId-entityType-status. Values are arrays of contributions that belong to the same group.

  Example structure:

  {crag1-id:
    {
      crag: {...}
      childContributions:
        {crag1-id-contributor1-route-draft:
            [route contribution 1, route contribution 2, ...]
          crag1-id-contributor1-route-in_review
            [route contribution 3, ...]
          crag1-id-contributor1-sector-draft
            [sector contribution 1, ...]
          crag1-id-contributor2-sector-draft
            [sector contribution 2, ...]
          crag1-id-contributor2-sector-in_review
            [sector contribution 3, ...]
        }
    },
  crag2-id:
    {
      crag: {...}
      childContributions:
      {...}
    }
  ...
  }

*/

function groupContributions(contributions: TContribution[]) {
  const contributionsGroups: {
    [key: string]: TContributionsGroup;
  } = {};

  contributions.forEach((contribution) => {
    let crag: TContributionsGroupCrag;
    switch (contribution.entity) {
      case "crag":
        if (!contribution.crag) return;
        crag = contribution.crag;
        break;
      case "sector":
        if (!contribution.sector?.crag) return;
        if (
          contribution.sector.name === "" &&
          contribution.sector.label === "" &&
          contribution.sector.crag.sectors.length === 1
        ) {
          // this is a dummy sector of a sectorless crag, skip it since it should not be shown in the contributions list
          return;
        }
        crag = contribution.sector?.crag;
        break;
      case "route":
        if (!contribution.route?.crag) return;
        crag = contribution.route?.crag;
        break;
      default:
        return;
    }

    const contributorId = contribution.user?.id;
    const entityType = contribution.entity;
    const status = contribution.publishStatus;

    const groupKey = `${crag?.id}-${contributorId}-${entityType}-${status}`;

    if (!contributionsGroups[crag?.id]) {
      contributionsGroups[crag?.id] = {
        crag: crag,
        childContributions: {},
      };
    }

    if (!contributionsGroups[crag?.id].childContributions[groupKey]) {
      contributionsGroups[crag?.id].childContributions[groupKey] = [];
    }

    contributionsGroups[crag?.id].childContributions[groupKey].push(
      contribution
    );
  });

  return contributionsGroups;
}

export default ContributionsPage;
export type { TContribution, TContributionsGroup };

gql`
  query ContributionsPageContributions {
    contributions {
      user {
        id
        fullName
        gender
      }

      entity

      crag {
        id
        name
        slug
        publishStatus
        sectors {
          publishStatus
          routes {
            publishStatus
          }
        }
        user {
          id
        }
      }

      sector {
        id
        name
        label
        publishStatus
        position
        crag {
          id
          name
          slug
          publishStatus
          sectors {
            id
          }
        }
        routes {
          publishStatus
        }
        user {
          id
        }
      }

      route {
        id
        name
        slug
        publishStatus
        crag {
          id
          name
          slug
          publishStatus
          sectors {
            id
          }
        }
        sector {
          id
          name
          label
          publishStatus
          position
        }
        user {
          id
        }
      }

      id
      publishStatus
    }
  }
`;
