"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";

export default function PopoverTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mb-10">
        For general hui popover testing. Can delete later...
      </div>

      <Popover className="relative">
        <PopoverButton
          onClick={(e) => {
            console.log("open it");
            // e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          Solutions
        </PopoverButton>
        {isOpen && (
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col focus:bg-blue-50"
            // focus={true}
            static
          >
            <a
              className="focus:text-red-500 outline-none"
              tabIndex={0}
              href="/analytics"
            >
              Analytics
            </a>
            <a href="/engagement">Engagement</a>
            <a href="/security">Security</a>
            <a href="/integrations">Integrations</a>
          </PopoverPanel>
        )}
      </Popover>

      <div className="mt-14 w-80 mx-auto">
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
