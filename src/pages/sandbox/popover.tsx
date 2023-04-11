import Button from "../../components/ui/button";
import Checkbox from "../../components/ui/checkbox";
import IconColumns from "../../components/ui/icons/columns";
import Link from "../../components/ui/link";
import Popover from "../../components/ui/popover";

function PopoverPage() {
  return (
    <div className="m-8">
      <h3>Popover demo</h3>

      <div className="mt-14">
        <h5>A default popover</h5>
        <div className="mt-4">
          <Popover openTrigger={<span>Open popover</span>}>
            <div>Some text in a popover</div>
          </Popover>
        </div>
      </div>

      <div className="mt-14">
        <h5>A popover triggered by a button</h5>
        <div className="mt-4">
          <Popover openTrigger={<Button>Open popover</Button>}>
            <div>Some text in a popover</div>
          </Popover>
        </div>
      </div>

      <div className="mt-14">
        <h5>A popover triggered by an icon</h5>
        <div className="mt-4">
          <Popover
            openTrigger={
              <Button renderStyle="icon" className="flex gap-2">
                <IconColumns />
                <span>Izberi stolpce</span>
              </Button>
            }
          >
            <div className="flex flex-col gap-1">
              <Checkbox>Ime</Checkbox>
              <Checkbox>Dolžina</Checkbox>
              <Checkbox>Težavnost</Checkbox>
              <Checkbox>Število uspešnih vzponov</Checkbox>
              <Checkbox>Število poskusov</Checkbox>
              <Checkbox>Število plezalcev</Checkbox>
              <Checkbox>Lepota smeri</Checkbox>
              <Checkbox>Večraztežajna smer</Checkbox>
              <Checkbox>Smer ima komentarje</Checkbox>
              <Checkbox>Moji vzponi</Checkbox>
            </div>
          </Popover>
        </div>
      </div>

      <div className="mt-14">
        <h5>A popover triggered by a link</h5>
        <div className="mt-4">
          <Popover openTrigger={<Link href="">Some link</Link>}>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              metus lorem, lobortis non ante et, suscipit convallis odio. Fusce
              at tempor tellus. Morbi at bibendum nisl. Aenean augue massa,
              semper in neque at, condimentum varius ex. Nulla nec pulvinar
              nisi. Cras efficitur, est a auctor eleifend, mauris dui fringilla
              nulla, rhoncus aliquam diam ex nec mauris. Suspendisse lacus diam,
              elementum sed libero quis, iaculis laoreet massa. Donec finibus mi
              est, quis vestibulum velit sodales nec. Aliquam ultricies urna sit
              amet nulla congue semper.
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default PopoverPage;
