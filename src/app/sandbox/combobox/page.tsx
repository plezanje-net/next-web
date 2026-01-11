"use client";
import Combobox from "@/components/ui/combobox";
import populateCragsAction from "./server-actions/populate-crags-action";
import populateRoutesAction from "./server-actions/populate-routes-action";

function ComboboxPage() {
  async function populateCrags(text: string) {
    if (text === "") {
      return [];
    }
    const crags = await populateCragsAction(text);
    return crags.map((crag) => ({
      value: crag.id,
      name: crag.name,
    }));
  }

  async function populateRoutes(text: string) {
    if (text === "") {
      return [];
    }
    const routes = await populateRoutesAction(text);
    return routes.map((route) => ({
      value: route.id,
      name: `${route.name}, ${route.crag.name}`,
    }));
  }

  function handleChange(a: string | null) {
    console.log("handleChange", a);
  }

  return (
    <div className="m-8">
      <h3>Combobox demo</h3>

      <div className="mt-14 w-80">
        <h5>Crag finder</h5>
        <div className="mt-4">
          <Combobox
            value={{
              value: "2ab5496f-df5a-47ae-a0d4-ec53ec81c69f",
              name: "Kotečnik",
            }}
            onChange={handleChange}
            populate={populateCrags}
          />
        </div>
      </div>
      <div className="mt-14 w-80">
        <h5>Route finder</h5>
        <div className="mt-4">
          <Combobox
            value={null}
            onChange={handleChange}
            populate={populateRoutes}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        Some ipsum to get scrollbar
        <br />
        Lorem ipsum odor amet, consectetuer adipiscing elit. Fames massa fames
        tellus non mollis purus. Nisi platea non lacus curabitur sem etiam
        lacus. Ex amet sed penatibus iaculis etiam sem suscipit dignissim. Et
        dictumst netus sed efficitur arcu. Nam integer iaculis egestas neque
        sociosqu ad. Litora enim luctus nulla odio eleifend. Per mollis nunc
        semper sociosqu venenatis tincidunt id. Et aliquam nisi mattis viverra
        ultrices in dolor. Ridiculus ante praesent cras libero ullamcorper.
        Fringilla lorem torquent pharetra accumsan congue maecenas. Dignissim
        mattis bibendum sollicitudin, placerat tempus purus quis. Torquent
        praesent erat dictumst platea metus nibh natoque praesent. Tempus ex
        cursus lobortis urna torquent. Penatibus nec pulvinar lectus vitae dui;
        odio dictum lorem sollicitudin. Sit vel et etiam ante fringilla
        fringilla. Habitasse vivamus amet volutpat feugiat cursus posuere
        habitant. Platea iaculis gravida turpis massa ad magna montes. Finibus
        duis ridiculus fermentum habitant, justo finibus duis scelerisque
        facilisis. Aliquet pharetra tempor nisl senectus tellus est gravida.
        Porttitor maximus class laoreet per hac ac varius. Curae bibendum
        maximus ac ultricies aenean fermentum. Malesuada mollis facilisis velit
        aliquam habitant purus eu est. Tortor sed ante porttitor ad auctor
        cubilia libero. Nam nulla aenean ultrices; pharetra a penatibus felis.
        Neque hac porta nostra tincidunt sapien tellus fermentum consequat. Nisi
        ultricies libero suspendisse praesent phasellus turpis! Aenean venenatis
        curabitur mus torquent etiam nam. Viverra scelerisque suspendisse aptent
        commodo elit odio lobortis iaculis. Vestibulum eleifend erat gravida
        facilisi sed pharetra maecenas sollicitudin. Alitora montes platea ex
        blandit. Penatibus tempus cras blandit maximus mus ipsum fusce? Platea
        sociosqu venenatis felis justo praesent nostra vulputate tellus. Cursus
        felis dignissim libero erat at sagittis facilisis elementum. Morbi vel
        tincidunt finibus ornare ullamcorper ex nec. Tempor congue scelerisque
        etiam ut, interdum litora mollis. Diam orci venenatis etiam eleifend
        nisl finibus conubia. Donec vestibulum in egestas maecenas sollicitudin
        cursus senectus. Id praesent rutrum bibendum nulla adipiscing risus
        quam. Volutpat quam accumsan elementum posuere erat parturient. Aliquet
        tellus in eleifend finibus commodo praesent aenean potenti. Consectetur
        dignissim aliquet arcu rutrum faucibus donec, eu tristique convallis.
      </div>
    </div>
  );
}

export default ComboboxPage;
