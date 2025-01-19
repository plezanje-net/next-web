"use client";

import Button from "@/components/ui/button";
import DropdownMenu, { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";

function DropdownMenuPage() {
  return (
    <div className="m-8">
      <h3>Dropdown menu demo</h3>
      <div className="mt-14">
        <h5>First menu</h5>

        <div className="mt-4">
          <DropdownMenu
            openTrigger={
              <Button variant="quaternary">
                <IconMore size={IconSize.regular} />
              </Button>
            }
          >
            <DropdownMenuItem
              onClick={() => {
                console.log("Dodaj clicked in menu 1");
              }}
            >
              Dodaj plezališče
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Dodaj fotografijo</DropdownMenuItem>
            <DropdownMenuItem href="/">Uredi profil</DropdownMenuItem>
            <DropdownMenuItem>Izbriši podatke</DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-14">
        <h5>Second menu</h5>
        <div className="mt-4">
          <DropdownMenu
            openTrigger={<Button variant="quaternary">Open menu</Button>}
          >
            <DropdownMenuItem
              onClick={() => {
                console.log("Dodaj clicked in menu 2");
              }}
            >
              Dodaj plezališče
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Dodaj fotografijo</DropdownMenuItem>
            <DropdownMenuItem href="/">Uredi profil</DropdownMenuItem>
            <DropdownMenuItem>Izbriši podatke</DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Menu item can be a nextjs link or a button.</li>
            <li>If a href is passed it will be a link.</li>
            <li>If an onClick is passed it will be a button.</li>
            <li>
              In the example above, first item is a button, second item is
              disabled, third is a link, fourth is not wired.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenuPage;
