/* This is an auto-generated file. */
export type TGradingSystemId = "french" | "uiaa" | "yds" | "font" | "hueco" | "aid" | "mix" | "waterIce" | "alpineIce" | "angle" | "ifas";

  type TGradingSystem = {
  __typename?: 'GradingSystem';
  grades: TGrade[];
  id: string;
  name: string;
  routeTypes: TRouteType[];
};

  type TGrade = {
  __typename?: 'Grade';
  difficulty: number;
  id: string;
  name: string;
};

  type TRouteType = {
  __typename?: 'RouteType';
  id: string;
  name: string;
};

export type TGradingSystems = Record<TGradingSystemId, TGradingSystem>;

export const gradingSystems =  {
    "french": {
        "name": "French",
        "id": "french",
        "grades": [
            {
                "difficulty": 100,
                "name": "1",
                "id": "1bcafc07-6d5c-4ffb-b014-68af4fa3f0cd",
                "__typename": "Grade"
            },
            {
                "difficulty": 200,
                "name": "2",
                "id": "757c0f1a-e039-4933-acf6-eda826d3d3d2",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "3",
                "id": "bcfd3a6a-b26a-4566-9729-b24827fdfa21",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "4a",
                "id": "ff8ad523-11ae-4a98-b934-09265bf55f58",
                "__typename": "Grade"
            },
            {
                "difficulty": 450,
                "name": "4a+",
                "id": "5a388e2c-e475-43fe-a6e1-4c6c07a2dde3",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "4b",
                "id": "46e225cb-ab1c-4ad5-95eb-a7f8c3e53642",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "4b+",
                "id": "eff14c4f-6ad2-472e-b4a4-df61769d69d6",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "4c",
                "id": "b1219e86-fc85-477e-9e45-35264e175224",
                "__typename": "Grade"
            },
            {
                "difficulty": 650,
                "name": "4c+",
                "id": "d58d0288-6360-498b-9d44-eddcbb65bb93",
                "__typename": "Grade"
            },
            {
                "difficulty": 700,
                "name": "5a",
                "id": "9f4c97f2-5f14-4b64-b3ae-41da0f73ffb1",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "5a+",
                "id": "69060f69-3a92-49da-8d21-0f60301cb1f9",
                "__typename": "Grade"
            },
            {
                "difficulty": 800,
                "name": "5b",
                "id": "2cda9cb8-66f8-4e7b-9955-d4e76e5eebff",
                "__typename": "Grade"
            },
            {
                "difficulty": 850,
                "name": "5b+",
                "id": "a90ca859-83ed-43ef-a154-bbcdc268d68c",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "5c",
                "id": "e3727281-3a61-49f5-9c28-bbc6aa3e6162",
                "__typename": "Grade"
            },
            {
                "difficulty": 950,
                "name": "5c+",
                "id": "e9b8ae49-1a28-4c93-ac21-6863b03c7a46",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "6a",
                "id": "f425b268-c14a-43e5-933e-81cf44d44f19",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "6a+",
                "id": "7df041f6-2823-4b75-a666-c69462bbd713",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "6b",
                "id": "3c95837b-70a0-4dde-86f1-4bb14851689b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "6b+",
                "id": "8f48d404-f749-45a8-8c7b-fe434fa870db",
                "__typename": "Grade"
            },
            {
                "difficulty": 1200,
                "name": "6c",
                "id": "7e064f8f-235c-48e0-b2df-83371271aa31",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "6c+",
                "id": "4fcd8c80-5d90-47a8-9b96-fe42cbe3e756",
                "__typename": "Grade"
            },
            {
                "difficulty": 1300,
                "name": "7a",
                "id": "883c3405-219e-4847-94f9-be5985ef50a1",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "7a+",
                "id": "1d872c7b-eb11-47b6-987a-4bfaea4e6053",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "7b",
                "id": "f594adaf-6d9b-47a5-94f3-fba8892da305",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "7b+",
                "id": "2099de36-0bdb-4dd0-92dd-895721849b9b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "7c",
                "id": "ef9882ac-6700-4700-831c-8d134ab90e2e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1550,
                "name": "7c+",
                "id": "cd92f775-7476-4a25-a96f-9752480d7acb",
                "__typename": "Grade"
            },
            {
                "difficulty": 1600,
                "name": "8a",
                "id": "b6215099-9603-4e74-9a6e-233108060cd3",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "8a+",
                "id": "3a01a7bd-83e2-469e-a388-85df490742ed",
                "__typename": "Grade"
            },
            {
                "difficulty": 1700,
                "name": "8b",
                "id": "d8db1ede-cf52-4651-a1d5-be02d91e0ef7",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "8b+",
                "id": "f7f32570-6c69-474a-a52a-8649bb2f4424",
                "__typename": "Grade"
            },
            {
                "difficulty": 1800,
                "name": "8c",
                "id": "ff13a3e4-0b5c-4b4d-9579-a6b63f2bf8a7",
                "__typename": "Grade"
            },
            {
                "difficulty": 1850,
                "name": "8c+",
                "id": "a65bb743-21ff-45e3-b283-a4374cd026ad",
                "__typename": "Grade"
            },
            {
                "difficulty": 1900,
                "name": "9a",
                "id": "f478ec1c-9d76-45cb-96cc-0741ace6bf4b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1950,
                "name": "9a+",
                "id": "a20cbee0-905f-4669-932f-77ffee200435",
                "__typename": "Grade"
            },
            {
                "difficulty": 2000,
                "name": "9b",
                "id": "5e55c2c6-dc87-4670-8b5e-717125566340",
                "__typename": "Grade"
            },
            {
                "difficulty": 2050,
                "name": "9b+",
                "id": "cf2edd87-9427-4b15-849b-3ec99785d295",
                "__typename": "Grade"
            },
            {
                "difficulty": 2100,
                "name": "9c",
                "id": "5076fa1e-01ce-449b-93ae-5606b745765d",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "sport",
                "name": "sport",
                "__typename": "RouteType"
            },
            {
                "id": "multipitch",
                "name": "multipitch",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "uiaa": {
        "name": "UIAA",
        "id": "uiaa",
        "grades": [
            {
                "difficulty": 100,
                "name": "I",
                "id": "c50e1b29-d963-4182-8444-bf36867b0d9e",
                "__typename": "Grade"
            },
            {
                "difficulty": 200,
                "name": "II",
                "id": "93253e0e-8b3a-40c8-85bf-bb42c4f0137d",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "III",
                "id": "e9f27dbb-cc48-4f69-9d13-ac5474eb9439",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "IV",
                "id": "2d2da1d9-d084-4005-8906-fc2d951ff7dd",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "IV+",
                "id": "0e502fa1-45cd-4a56-abb5-66e1027beafd",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "V-",
                "id": "1122eff6-a3da-40e2-a366-cfa560ffc9dc",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "V",
                "id": "45c8b727-780e-489d-b315-c0333954cfef",
                "__typename": "Grade"
            },
            {
                "difficulty": 700,
                "name": "V+",
                "id": "d8d9367a-62ea-4ee4-9f6d-e805b8d97c76",
                "__typename": "Grade"
            },
            {
                "difficulty": 800,
                "name": "VI-",
                "id": "14e52b5d-dc7b-4bd6-910a-580fd415de83",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "VI",
                "id": "edfbab0f-6d43-42b1-8e4d-b1c5cdb50a91",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "VI+",
                "id": "8647b03a-23fa-4fc5-853f-b62539ba5615",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "VII-",
                "id": "eeb88dc5-5e6d-41e4-b6a1-b7d4406471a8",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "VII",
                "id": "f32e64f9-cff6-4f4d-a877-076431bed168",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "VII+",
                "id": "2e2be7ab-2926-413e-b1a4-06603f2f44d1",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "VIII-",
                "id": "ba128b2b-9b13-4471-8869-4c7c05a85ed9",
                "__typename": "Grade"
            },
            {
                "difficulty": 1300,
                "name": "VIII",
                "id": "19e19db5-67dc-4f8d-9235-3883362b40a2",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "VIII+",
                "id": "0ba1cb1c-52a4-48be-b153-57ae899f5708",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "IX-",
                "id": "f7d5eb2b-b623-4a5e-be2b-2213fa4ee965",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "IX",
                "id": "3b1324c7-1f44-4a13-8fdc-d5ee36d21c88",
                "__typename": "Grade"
            },
            {
                "difficulty": 1550,
                "name": "IX+",
                "id": "b2dde1dd-e7ed-45fa-8fd7-0b9c1aa7e334",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "X-",
                "id": "27dc7ecb-7b2a-4aea-9339-c52be45a3059",
                "__typename": "Grade"
            },
            {
                "difficulty": 1700,
                "name": "X",
                "id": "4dcc4753-2cd4-404f-b6e9-40592727cc26",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "X+",
                "id": "93a5ec25-5483-44b1-9c4a-bbc53efcd4da",
                "__typename": "Grade"
            },
            {
                "difficulty": 1850,
                "name": "XI-",
                "id": "1b3256b9-b21b-44bd-9638-03698059dcea",
                "__typename": "Grade"
            },
            {
                "difficulty": 1900,
                "name": "XI",
                "id": "768337ac-f480-443f-a250-90a4263510ec",
                "__typename": "Grade"
            },
            {
                "difficulty": 1950,
                "name": "XI+",
                "id": "0d639dc7-2c1e-48ce-a601-d7c4e3a0a4d4",
                "__typename": "Grade"
            },
            {
                "difficulty": 2000,
                "name": "XII-",
                "id": "9149d233-87b1-4a59-b538-828898eb205b",
                "__typename": "Grade"
            },
            {
                "difficulty": 2050,
                "name": "XII",
                "id": "ef4dceb5-ee6f-4145-96d3-773ebc48b89d",
                "__typename": "Grade"
            },
            {
                "difficulty": 2100,
                "name": "XII+",
                "id": "cd8df30b-672e-4486-bf88-73f2a51af397",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "sport",
                "name": "sport",
                "__typename": "RouteType"
            },
            {
                "id": "multipitch",
                "name": "multipitch",
                "__typename": "RouteType"
            },
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "yds": {
        "name": "YDS (USA)",
        "id": "yds",
        "grades": [
            {
                "difficulty": 100,
                "name": "5.1",
                "id": "817c1d50-1259-4f59-b650-5625e412ca09",
                "__typename": "Grade"
            },
            {
                "difficulty": 200,
                "name": "5.2",
                "id": "c400de0c-059f-4f52-874b-4844dab34364",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "5.3",
                "id": "11ce804e-fa67-45c7-81a5-616f6ffba034",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "5.4",
                "id": "66b147eb-1378-4786-86ad-964b1d72a957",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "5.5",
                "id": "0c54398a-b572-418a-a42f-ee22df49555d",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "5.6",
                "id": "ca241eb8-2cd5-476e-9930-82c17a339703",
                "__typename": "Grade"
            },
            {
                "difficulty": 700,
                "name": "5.7",
                "id": "f2fb1df1-0368-4340-8135-a52403fde13a",
                "__typename": "Grade"
            },
            {
                "difficulty": 800,
                "name": "5.8",
                "id": "d428ad60-08fb-4b9e-a1f8-e3371178405e",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "5.9",
                "id": "9cc4f5f8-84a5-4632-a5e0-ef5f49a18208",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "5.10a",
                "id": "cc1110f0-9ff5-4edd-8885-752435c1c9f6",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "5.10b",
                "id": "d4761251-2266-4cd6-b40c-36f59ab7d3df",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "5.10c",
                "id": "92e9a634-46a6-4eb8-b0b8-9f11d2a37c7c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "5.10d",
                "id": "6e5f501b-fcaf-46aa-8242-6625d7dce762",
                "__typename": "Grade"
            },
            {
                "difficulty": 1175,
                "name": "5.11a",
                "id": "d4eb6157-b846-4ac6-8d06-f3bf8980918e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1200,
                "name": "5.11b",
                "id": "03e4c712-b8ee-4d2e-b199-31c93f6986e4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "5.11c",
                "id": "d0f6e2c9-c7f6-4e46-b5f2-ef1987dde9da",
                "__typename": "Grade"
            },
            {
                "difficulty": 1300,
                "name": "5.11d",
                "id": "6f35a8a1-da19-47d2-b496-febafdac11b3",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "5.12a",
                "id": "d3aed356-6e9e-413f-b4c5-31a982f9215d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "5.12b",
                "id": "577b5dfe-1aa3-4e7a-81fd-30c0fab24077",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "5.12c",
                "id": "3fe2ec12-e0aa-403b-86db-76712dd5c368",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "5.12d",
                "id": "619bb036-c57a-4a74-b21c-e5d7a61715f1",
                "__typename": "Grade"
            },
            {
                "difficulty": 1550,
                "name": "5.13a",
                "id": "c642fa18-0ce3-4dd9-9cbc-31dd4e27bf4c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1600,
                "name": "5.13b",
                "id": "8628323f-7c96-4c7b-a9f0-152566c8e864",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "5.13c",
                "id": "3a6b134d-7921-4c90-8d19-85fefff11d34",
                "__typename": "Grade"
            },
            {
                "difficulty": 1700,
                "name": "5.13d",
                "id": "ca89cc5f-6d61-4dc3-8c24-9c0b2ad3611b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "5.14a",
                "id": "f0c53989-7a6c-4640-8688-8ba4452aa807",
                "__typename": "Grade"
            },
            {
                "difficulty": 1800,
                "name": "5.14b",
                "id": "aea30a3b-b1aa-4f73-9555-32aa5b2d6b38",
                "__typename": "Grade"
            },
            {
                "difficulty": 1850,
                "name": "5.14c",
                "id": "e69d26da-3f29-4f23-b4e6-1510eb566e2f",
                "__typename": "Grade"
            },
            {
                "difficulty": 1900,
                "name": "5.14d",
                "id": "b250b45d-3307-4d11-9e77-82d8a11e4fd8",
                "__typename": "Grade"
            },
            {
                "difficulty": 1950,
                "name": "5.15a",
                "id": "243c2021-76a4-42f7-bd4b-b2048fcb62d7",
                "__typename": "Grade"
            },
            {
                "difficulty": 2000,
                "name": "5.15b",
                "id": "ce92b0af-1555-47d6-a3db-34be5a300ac2",
                "__typename": "Grade"
            },
            {
                "difficulty": 2050,
                "name": "5.15c",
                "id": "8325cfd8-2f51-4e2a-b07c-b4ce9225a282",
                "__typename": "Grade"
            },
            {
                "difficulty": 2100,
                "name": "5.15d",
                "id": "f0a8af29-3d50-4331-8878-f1f898eb6e2a",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "sport",
                "name": "sport",
                "__typename": "RouteType"
            },
            {
                "id": "multipitch",
                "name": "multipitch",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "font": {
        "name": "Font",
        "id": "font",
        "grades": [
            {
                "difficulty": 450,
                "name": "1",
                "id": "e0994f5a-db15-4bf4-a691-8a5ea633712a",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "1+",
                "id": "03e86566-cf97-45db-b459-8f276998241d",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "2-",
                "id": "7176a1c0-143f-4e9c-b570-42acc88b3d67",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "2",
                "id": "47da9634-5fbd-4620-ae28-86c7acef9344",
                "__typename": "Grade"
            },
            {
                "difficulty": 650,
                "name": "2+",
                "id": "b1fc957e-37d1-4355-8173-858641356233",
                "__typename": "Grade"
            },
            {
                "difficulty": 700,
                "name": "3-",
                "id": "c9c41ade-24bf-45af-9696-46d51b7e986e",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "3",
                "id": "6763dc1b-cbba-47f6-86a1-7c495544d34d",
                "__typename": "Grade"
            },
            {
                "difficulty": 800,
                "name": "3+",
                "id": "71c89e5e-82dd-478b-806a-36ce1bfe3677",
                "__typename": "Grade"
            },
            {
                "difficulty": 850,
                "name": "4-",
                "id": "fc50e960-a925-437f-8108-b128b612852f",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "4",
                "id": "e07cff29-8afa-4bfb-97ba-b3c4e235a88d",
                "__typename": "Grade"
            },
            {
                "difficulty": 950,
                "name": "4+",
                "id": "9bb0695c-a8d0-4103-9e30-c1c52fa9090e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "5-",
                "id": "2d35ed65-4aca-4db0-9ab2-40cec878e0a4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "5",
                "id": "00d2e208-05c0-4b64-967b-364be3d6457e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "5+",
                "id": "54a14adc-aead-44c6-bc98-f7c3adefa52b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "6a",
                "id": "8121e1c6-3e64-4847-a969-35fd50cce4f6",
                "__typename": "Grade"
            },
            {
                "difficulty": 1200,
                "name": "6a+",
                "id": "3345075b-3e80-42c0-8845-3d5df7a012c4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "6b",
                "id": "f71cfb88-1690-432a-bd32-495da7f3a584",
                "__typename": "Grade"
            },
            {
                "difficulty": 1300,
                "name": "6b+\r",
                "id": "ca80b7f4-dbf6-4695-a983-a52bb11f9c52",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "6c",
                "id": "3b9f4b54-37b5-4c34-9333-fdaeb6bd0e68",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "6c+",
                "id": "957af9f6-960d-4ab7-afda-9ffdb824e3ba",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "7a",
                "id": "bbc9cca2-ea7f-407b-9893-f53e59c86a9c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "7a+",
                "id": "7fc2c0c5-c3d7-4dfd-86e8-0e56ff9d0c9b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1550,
                "name": "7b",
                "id": "41bddb94-29eb-44d1-9256-31240f937897",
                "__typename": "Grade"
            },
            {
                "difficulty": 1600,
                "name": "7b+",
                "id": "31e1816d-7fe9-4431-a4f2-d301c3bb9aa8",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "7c",
                "id": "27a723c9-4f61-4d3a-a841-65368f38ebb4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1700,
                "name": "7c+",
                "id": "9a8b5284-f5e5-400f-a72d-37138ce0f326",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "8a",
                "id": "934201ec-36fa-4c1c-bdac-cace64e09c0a",
                "__typename": "Grade"
            },
            {
                "difficulty": 1800,
                "name": "8a+",
                "id": "506d31d8-d2d1-4679-a80d-d141ca1f2191",
                "__typename": "Grade"
            },
            {
                "difficulty": 1850,
                "name": "8b",
                "id": "e0eb7af2-ee66-4679-b369-27c3883c629d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1900,
                "name": "8b+",
                "id": "21e72d68-02c8-4ad5-b684-2272c54ae92c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1950,
                "name": "8c",
                "id": "643c1806-f45a-4aa0-b22b-3a52422a30d1",
                "__typename": "Grade"
            },
            {
                "difficulty": 2000,
                "name": "8c+",
                "id": "b578538c-d0c0-4c59-a628-57ebb1f1a499",
                "__typename": "Grade"
            },
            {
                "difficulty": 2050,
                "name": "9a",
                "id": "7e60bd48-218f-4b9f-a42f-72c952b69931",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "boulder",
                "name": "boulder",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "hueco": {
        "name": "Hueco",
        "id": "hueco",
        "grades": [
            {
                "difficulty": 750,
                "name": "VB",
                "id": "0c03af97-3612-4c19-bc24-7ea3667942f1",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "V0",
                "id": "a9a84e1c-a72b-4251-afeb-a06ebf871ab7",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "V1",
                "id": "afefad09-08af-4494-8718-9cc118c6a1d2",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "V2",
                "id": "5ad2cb43-6934-45fc-bb8e-12a47fb602c5",
                "__typename": "Grade"
            },
            {
                "difficulty": 1175,
                "name": "V3",
                "id": "83b0b549-b0a7-4130-abba-f2c64f4b0cdd",
                "__typename": "Grade"
            },
            {
                "difficulty": 1275,
                "name": "V4",
                "id": "50ba1a4e-58e9-49d5-8405-fe0e55dff0af",
                "__typename": "Grade"
            },
            {
                "difficulty": 1375,
                "name": "V5",
                "id": "9b791888-9b22-47e1-b8bf-c177225b7c38",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "V6",
                "id": "5c230483-2d14-4de4-8ec3-aa78ac4db0b0",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "V7",
                "id": "cc287c53-ddd8-4c86-b6e7-b8ea737cf891",
                "__typename": "Grade"
            },
            {
                "difficulty": 1575,
                "name": "V8",
                "id": "9a6e33c3-3ff5-4ecd-90e5-65080367da81",
                "__typename": "Grade"
            },
            {
                "difficulty": 1625,
                "name": "V9",
                "id": "02e4cb6e-b9c2-40b5-a3e7-50f45b86dd3b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1700,
                "name": "V10",
                "id": "daf849cb-3d16-41af-b60e-36f36ab64505",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "V11",
                "id": "062b6bfe-01af-40f3-ad7c-9c95c5412bf0",
                "__typename": "Grade"
            },
            {
                "difficulty": 1800,
                "name": "V12",
                "id": "9fcfb83c-032c-4065-984d-3c24997e5d10",
                "__typename": "Grade"
            },
            {
                "difficulty": 1850,
                "name": "V13",
                "id": "7d82ef50-1d41-4ffb-9c56-11d109957513",
                "__typename": "Grade"
            },
            {
                "difficulty": 1900,
                "name": "V14",
                "id": "26147a2a-b747-4d94-8d09-e262edb04c15",
                "__typename": "Grade"
            },
            {
                "difficulty": 1950,
                "name": "V15",
                "id": "122d9ca9-f8a4-4e97-8317-bccc688c62ca",
                "__typename": "Grade"
            },
            {
                "difficulty": 2000,
                "name": "V16",
                "id": "b1468c1f-6750-440f-bfea-46dabb8f5758",
                "__typename": "Grade"
            },
            {
                "difficulty": 2050,
                "name": "V17",
                "id": "8d6ea740-99a8-4618-bace-f5d913400ade",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "boulder",
                "name": "boulder",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "aid": {
        "name": "Aid",
        "id": "aid",
        "grades": [
            {
                "difficulty": 275,
                "name": "A0",
                "id": "567c8c3a-0c5e-41fd-88dd-648c0106c260",
                "__typename": "Grade"
            },
            {
                "difficulty": 375,
                "name": "A0+",
                "id": "dc5cd440-2da6-48c3-a534-773d07b543b2",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "A1",
                "id": "aa6229e8-92fd-40ae-a28a-46507d90d933",
                "__typename": "Grade"
            },
            {
                "difficulty": 625,
                "name": "A1+",
                "id": "40c8fdaa-75c3-4080-86e5-09ec6c2cec3e",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "A2",
                "id": "96cd18c0-6bc4-42eb-ba85-a96526de4c78",
                "__typename": "Grade"
            },
            {
                "difficulty": 875,
                "name": "A2+",
                "id": "7dfaa2e5-9cb4-4646-bd5e-55b7e87594aa",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "A3",
                "id": "c8c86ee9-d7a3-45d0-a2cc-95c27f95081d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1125,
                "name": "A3+",
                "id": "e1c5935a-6c8b-4dc6-9598-ae89402a6656",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "A4",
                "id": "8d40b6f0-0396-442c-bd39-f36de1b8dbad",
                "__typename": "Grade"
            },
            {
                "difficulty": 1375,
                "name": "A4+",
                "id": "2cda9ea6-ae97-4830-8b5c-77354975ae02",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "A5",
                "id": "4774d5c1-f697-45a5-8d1a-da574d088604",
                "__typename": "Grade"
            },
            {
                "difficulty": 1625,
                "name": "A5+",
                "id": "2b014ce9-b579-407a-9bf5-885a5aa55b09",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "A6",
                "id": "279fee76-67dd-42e8-984b-bafa57a68769",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "mix": {
        "name": "Mix",
        "id": "mix",
        "grades": [
            {
                "difficulty": 375,
                "name": "M1",
                "id": "f3ca86e4-b4ef-43ca-9a95-5f24a17627d7",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "M2",
                "id": "49368d55-902d-485f-babc-f0d8a46c89fc",
                "__typename": "Grade"
            },
            {
                "difficulty": 625,
                "name": "M3",
                "id": "225216d1-a990-42c1-a948-ccd6be419a76",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "M4",
                "id": "76cd0d12-a82f-4dd7-8934-3f4e7cd90ab4",
                "__typename": "Grade"
            },
            {
                "difficulty": 875,
                "name": "M5",
                "id": "721a8d22-57b7-4e6b-8d87-a3758d2d26b4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "M6",
                "id": "22fb036e-bfca-4674-ab87-5ab10c02daf3",
                "__typename": "Grade"
            },
            {
                "difficulty": 1125,
                "name": "M7",
                "id": "4fc0ca64-74d7-46e9-8e5f-5a5a7df1f513",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "M8",
                "id": "0442d926-90ad-4b97-934e-a6fbc2be70aa",
                "__typename": "Grade"
            },
            {
                "difficulty": 1375,
                "name": "M9",
                "id": "82f3ce67-6b78-4b9c-96e9-9aa62ba06f5c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "M10",
                "id": "032c79bf-f85b-4d36-80ee-110cf97f4355",
                "__typename": "Grade"
            },
            {
                "difficulty": 1625,
                "name": "M11",
                "id": "73acf293-97cb-4820-b888-c05fac00a1cb",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "M12",
                "id": "7d747708-8b86-4a49-91a0-60b6e9431170",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "waterIce": {
        "name": "Water Ice",
        "id": "water-ice",
        "grades": [
            {
                "difficulty": 250,
                "name": "WI1-",
                "id": "55a7ff0e-1415-41a6-97b1-4c85b732ac0e",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "WI1",
                "id": "7e03cc16-ae57-46e6-9923-f76a0032eb9e",
                "__typename": "Grade"
            },
            {
                "difficulty": 350,
                "name": "WI1+",
                "id": "ecd9f946-bb4e-4b74-b87a-2f1bfd09aa52",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "WI2-",
                "id": "42067a61-1ec2-4175-afec-4ee00aef7f36",
                "__typename": "Grade"
            },
            {
                "difficulty": 450,
                "name": "WI2",
                "id": "cc6d7601-f663-4cd5-87b1-fe30ad1abc0b",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "WI2+",
                "id": "5cf07b43-15b9-4648-9f22-cb1271547724",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "WI3-",
                "id": "6294b836-cb41-4fa7-8dca-bb6c9212139b",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "WI3",
                "id": "6b88ec98-d648-4d36-9d98-44699ee9ceaa",
                "__typename": "Grade"
            },
            {
                "difficulty": 675,
                "name": "WI3+",
                "id": "868521cb-74a0-4ad0-97ce-da0f133332a8",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "WI4-",
                "id": "dbb20eb3-e89c-4182-b310-844f7dc40363",
                "__typename": "Grade"
            },
            {
                "difficulty": 825,
                "name": "WI4",
                "id": "1264627c-c70a-49a1-a8cc-f1d60bc80b01",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "WI4+",
                "id": "925d94d0-21e4-44ec-8e07-7dc169e56a05",
                "__typename": "Grade"
            },
            {
                "difficulty": 975,
                "name": "WI5-",
                "id": "46138a7b-1f18-4813-bf03-41b814c4bbea",
                "__typename": "Grade"
            },
            {
                "difficulty": 1025,
                "name": "WI5",
                "id": "bf46875a-1c47-4545-a1d4-6ebb21bf70c6",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "WI5+",
                "id": "b487290b-282a-477c-8135-a4aa05d8cd17",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "WI6-",
                "id": "56605efe-d46c-4fea-a61a-a65bb730f49e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1225,
                "name": "WI6",
                "id": "265bd1f1-c073-47e9-8ba5-c6bfa4dc1657",
                "__typename": "Grade"
            },
            {
                "difficulty": 1275,
                "name": "WI6+",
                "id": "2468fee6-f5ce-44ae-84da-cbc958d1096a",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "WI7-",
                "id": "2a121f05-389c-4deb-bf17-07685ad17a31",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "WI7",
                "id": "429d4597-5948-4eed-b9a7-a74d8b934c0d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1475,
                "name": "WI7+",
                "id": "947c33fe-6d67-422f-8694-0128d4bb5a5c",
                "__typename": "Grade"
            },
            {
                "difficulty": 1575,
                "name": "WI8-",
                "id": "21baf086-7af7-4854-b4eb-81b67693a0a2",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "WI8",
                "id": "bb0793a2-c3a0-47c2-a966-5e994c348062",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "WI8+",
                "id": "2bb5d21a-52df-4036-9e6d-5f678f4e913d",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "alpineIce": {
        "name": "Alpine Ice",
        "id": "alpine-ice",
        "grades": [
            {
                "difficulty": 250,
                "name": "AI1-",
                "id": "1ae215ab-ce55-49b3-ab7b-e51aff0943ea",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "AI1",
                "id": "38ad0107-7e61-4052-a991-f9507d5b4cb5",
                "__typename": "Grade"
            },
            {
                "difficulty": 350,
                "name": "AI1+",
                "id": "78674c65-08ba-40d8-adb8-e7a0f6785287",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "AI2-",
                "id": "7b353057-bbbd-4c07-aff5-1a7c04742cf9",
                "__typename": "Grade"
            },
            {
                "difficulty": 450,
                "name": "AI2",
                "id": "382b56cc-d12b-4a28-863f-b190daea6d19",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "AI2+",
                "id": "1158494d-81e3-4a37-9d3a-271d1d09f98d",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "AI3-",
                "id": "b6c95f5a-0715-4ce1-989d-449aadba7466",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "AI3",
                "id": "3287739b-bb06-4d60-a9a7-6d56de09407d",
                "__typename": "Grade"
            },
            {
                "difficulty": 675,
                "name": "AI3+",
                "id": "72e75f51-4c07-4028-aed2-941081c5b446",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "AI4-",
                "id": "6b2e5232-c9a5-461f-9df9-e6b0bed14e4e",
                "__typename": "Grade"
            },
            {
                "difficulty": 825,
                "name": "AI4",
                "id": "ad75161a-480d-4245-acb5-461dc548a499",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "AI4+",
                "id": "d0c0c245-8c7f-4ed8-b506-6cbdc5c6e7f1",
                "__typename": "Grade"
            },
            {
                "difficulty": 975,
                "name": "AI5-",
                "id": "38697d26-7647-421e-9acb-067ebe55bf53",
                "__typename": "Grade"
            },
            {
                "difficulty": 1025,
                "name": "AI5",
                "id": "a962ee3e-860d-41a1-9660-4d92d7fa2b4b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "AI5+",
                "id": "b752ae4e-a73e-4c29-9009-690157eff871",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "AI6-",
                "id": "c73ac4a4-96f1-4360-885e-8b176c57401b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1225,
                "name": "AI6",
                "id": "92241ac5-1c3f-463a-8fb5-99834dcaa3f7",
                "__typename": "Grade"
            },
            {
                "difficulty": 1275,
                "name": "AI6+",
                "id": "a900f875-9fbb-4ad1-8e92-ac0479c520f2",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "AI7-",
                "id": "f0875267-1649-4abb-b5ba-253e0cd46ea4",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "AI7",
                "id": "92677c93-b1c8-4b60-82b9-13274c9f264a",
                "__typename": "Grade"
            },
            {
                "difficulty": 1475,
                "name": "AI7+",
                "id": "0dce9a9c-9c4c-4def-958c-76c3b4c4f034",
                "__typename": "Grade"
            },
            {
                "difficulty": 1575,
                "name": "AI8-",
                "id": "4758db8e-dad6-44f2-8a72-84adf4d4f360",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "AI8",
                "id": "9438f976-5b7f-4a67-9b5b-6992d1594114",
                "__typename": "Grade"
            },
            {
                "difficulty": 1750,
                "name": "AI8+",
                "id": "33860ab7-72af-496d-93ad-22abf946603e",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "angle": {
        "name": "Angle",
        "id": "angle",
        "grades": [
            {
                "difficulty": 225,
                "name": "35°",
                "id": "98e95e82-e451-42d3-8ca0-180ad72ef374",
                "__typename": "Grade"
            },
            {
                "difficulty": 225,
                "name": "32°",
                "id": "57e3543f-ebab-4c95-a8cd-4eb977cc03d2",
                "__typename": "Grade"
            },
            {
                "difficulty": 250,
                "name": "40°",
                "id": "471c6e4a-74af-4ea1-972d-a27435d144de",
                "__typename": "Grade"
            },
            {
                "difficulty": 275,
                "name": "45°",
                "id": "50dfbf54-a289-4cd0-85a0-1dfac8c052cf",
                "__typename": "Grade"
            },
            {
                "difficulty": 275,
                "name": "45°",
                "id": "ad0ef7c4-f36e-4f9f-b04e-214e4eb499b1",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "50°",
                "id": "891c105f-985b-4bca-bea3-7d6de1cad254",
                "__typename": "Grade"
            },
            {
                "difficulty": 325,
                "name": "55°",
                "id": "975e5a81-59c9-40a1-a8c1-420f75174103",
                "__typename": "Grade"
            },
            {
                "difficulty": 325,
                "name": "55°",
                "id": "92943e74-1338-4815-acc4-569c49116b4d",
                "__typename": "Grade"
            },
            {
                "difficulty": 350,
                "name": "60°",
                "id": "041978ca-b094-4aed-b968-31ec53a4d70f",
                "__typename": "Grade"
            },
            {
                "difficulty": 450,
                "name": "65°",
                "id": "54c6f6d4-d0f1-4e2d-8e27-76bfc543e0f0",
                "__typename": "Grade"
            },
            {
                "difficulty": 525,
                "name": "70°",
                "id": "cfe5c055-dc0a-4dd2-b198-1f07a2c197f8",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "75°",
                "id": "43b92111-b2c7-4f2f-87b0-a4a8eea78c68",
                "__typename": "Grade"
            },
            {
                "difficulty": 825,
                "name": "80°",
                "id": "246decba-2f79-461b-ab09-6f3528b5f0bc",
                "__typename": "Grade"
            },
            {
                "difficulty": 1025,
                "name": "85°",
                "id": "c583d480-e326-45d4-bd65-832c8fd24240",
                "__typename": "Grade"
            },
            {
                "difficulty": 1225,
                "name": "90°",
                "id": "04004b7d-401c-4df4-9ac3-3a2adb60f95a",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "alpine",
                "name": "alpine",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    },
    "ifas": {
        "name": "IFAS",
        "id": "ifas",
        "grades": [
            {
                "difficulty": 200,
                "name": "F-",
                "id": "466003f6-0956-4c06-96c0-f583a6b97255",
                "__typename": "Grade"
            },
            {
                "difficulty": 250,
                "name": "F",
                "id": "4379e511-deab-4ef9-9656-5740b64d33ef",
                "__typename": "Grade"
            },
            {
                "difficulty": 300,
                "name": "F+",
                "id": "3a439052-5936-4156-b593-938b64f114cf",
                "__typename": "Grade"
            },
            {
                "difficulty": 350,
                "name": "PD-",
                "id": "3b6ae810-21da-470b-bee1-519e22ba18cd",
                "__typename": "Grade"
            },
            {
                "difficulty": 400,
                "name": "PD",
                "id": "fff48bdd-637c-4016-bd31-dd4234d1ad35",
                "__typename": "Grade"
            },
            {
                "difficulty": 450,
                "name": "PD+",
                "id": "38d22af6-3bbf-4f5a-ac7e-2bf1e8b7700e",
                "__typename": "Grade"
            },
            {
                "difficulty": 500,
                "name": "AD-",
                "id": "d805ec8b-f284-4338-9d18-20e33deffa26",
                "__typename": "Grade"
            },
            {
                "difficulty": 550,
                "name": "AD",
                "id": "3125704f-5a02-43e1-b3e4-05a0ca909892",
                "__typename": "Grade"
            },
            {
                "difficulty": 600,
                "name": "AD+",
                "id": "975859ff-82a3-40d0-bccf-8f98f0ba4636",
                "__typename": "Grade"
            },
            {
                "difficulty": 650,
                "name": "D-",
                "id": "ab04058b-9e00-467f-a52d-19ee3dd04a02",
                "__typename": "Grade"
            },
            {
                "difficulty": 700,
                "name": "D",
                "id": "0f2ccf39-c1ca-4b02-81c7-7fe88bc2416a",
                "__typename": "Grade"
            },
            {
                "difficulty": 750,
                "name": "D+",
                "id": "c9d77a0f-ff43-4c29-af1f-10036193f1c0",
                "__typename": "Grade"
            },
            {
                "difficulty": 800,
                "name": "TD-",
                "id": "47c0caf7-2472-4f32-85f6-2e1dbc20e349",
                "__typename": "Grade"
            },
            {
                "difficulty": 850,
                "name": "TD",
                "id": "5aff1e0b-7ac7-4706-b59b-0a9fa535d603",
                "__typename": "Grade"
            },
            {
                "difficulty": 900,
                "name": "TD+",
                "id": "fd3fe33d-317d-4c52-bc86-0b930d29d814",
                "__typename": "Grade"
            },
            {
                "difficulty": 950,
                "name": "ED1-",
                "id": "f6098937-c05f-41c1-8cc3-5180f83e387d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1000,
                "name": "ED1",
                "id": "06b825e0-d015-401e-a284-556c76348715",
                "__typename": "Grade"
            },
            {
                "difficulty": 1050,
                "name": "ED1+",
                "id": "54547286-4473-4069-bed2-055adfb1a5d2",
                "__typename": "Grade"
            },
            {
                "difficulty": 1100,
                "name": "ED2-",
                "id": "f55da770-e607-4d97-bb8b-9faa7380e32d",
                "__typename": "Grade"
            },
            {
                "difficulty": 1150,
                "name": "ED2",
                "id": "4178a6f2-cb09-48f0-be51-7e9c4756afbb",
                "__typename": "Grade"
            },
            {
                "difficulty": 1200,
                "name": "ED2+",
                "id": "07c4d309-cde0-40eb-ab13-6c274dec1ad5",
                "__typename": "Grade"
            },
            {
                "difficulty": 1250,
                "name": "ED3-",
                "id": "9c6f00ac-1866-4667-baea-d5fa598525b3",
                "__typename": "Grade"
            },
            {
                "difficulty": 1300,
                "name": "ED3",
                "id": "59dd387b-571e-4b6b-8317-1c716565f2bb",
                "__typename": "Grade"
            },
            {
                "difficulty": 1350,
                "name": "ED3+",
                "id": "f3e6a51b-e0ba-4691-aba1-530157724293",
                "__typename": "Grade"
            },
            {
                "difficulty": 1400,
                "name": "ED4-",
                "id": "3c36ce39-6f41-4016-9979-d0ed9290b183",
                "__typename": "Grade"
            },
            {
                "difficulty": 1450,
                "name": "ED4",
                "id": "f21b72ae-ada9-42d7-b1ab-fb2322a27e0b",
                "__typename": "Grade"
            },
            {
                "difficulty": 1500,
                "name": "ED4+",
                "id": "9614d2af-15d3-4184-ae19-7ccbd46733d0",
                "__typename": "Grade"
            },
            {
                "difficulty": 1550,
                "name": "ABO-",
                "id": "8146e4ae-1ee1-4725-b124-34e9b2d6a8f8",
                "__typename": "Grade"
            },
            {
                "difficulty": 1600,
                "name": "ABO",
                "id": "4325e63c-f2cc-4469-a305-1e0c3784197e",
                "__typename": "Grade"
            },
            {
                "difficulty": 1650,
                "name": "ABO+",
                "id": "446d7a40-832e-4b3a-b2d2-3968203a1c91",
                "__typename": "Grade"
            }
        ],
        "routeTypes": [
            {
                "id": "combined",
                "name": "combined",
                "__typename": "RouteType"
            }
        ],
        "__typename": "GradingSystem"
    }
}
