import IconColumns from "../../components/ui/icons/columns";
import IconFilter from "../../components/ui/icons/filter";
import IconMerge from "../../components/ui/icons/merge";
import IconSort from "../../components/ui/icons/sort";
import Button from "../../components/ui/button";
import Dialog, { DialogSize } from "../../components/ui/dialog";
import { Select, Option } from "../../components/ui/select";
import IconSearch from "../../components/ui/icons/search";
import TextField from "../../components/ui/text-field";

function CragTableActionsPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Crag table actions demo</h1>

      {/* outer wrap, to center actions */}
      <div className="mx-8 my-4 flex h-11 justify-center py-px xs:block">
        {/* middle wrap: left: other actions, right: search */}
        <div className="flex items-center xs:justify-between xs:gap-8">
          <div className="flex items-center">
            {/* Action: Filter */}
            <div className="flex cursor-pointer pr-4">
              <Dialog
                openTrigger={
                  <Button renderStyle="icon" className="flex">
                    <IconFilter />
                    <span>
                      <span className="ml-2 max-lg:hidden">Filtriraj</span>
                    </span>
                  </Button>
                }
                dialogSize={DialogSize.hug}
                title="Filtriraj smeri"
                confirm={{ label: "Filtriraj" }}
                cancel={{ label: "Prekliči" }}
              >
                <div className="flex flex-col flex-wrap gap-8 md:flex-row"></div>
              </Dialog>
            </div>

            {/* Action: Columns */}
            <div className="flex cursor-pointer border-l border-l-neutral-300 px-4">
              <Select
                multi
                customTrigger={
                  <Button renderStyle="icon" className="flex">
                    <IconColumns />

                    <span className="ml-2 max-lg:hidden">Izberi stolpce</span>
                  </Button>
                }
              >
                <Option id="1" value="1">
                  test1
                </Option>
                <Option id="2" value="2">
                  test2
                </Option>
                <Option id="3" value="3">
                  test3
                </Option>
              </Select>
            </div>

            {/* Action: Combine/Uncombine sectors */}
            <div className="flex cursor-pointer border-l border-l-neutral-300 px-4">
              <Button renderStyle="icon" className="flex">
                <IconMerge />
                <span className="ml-2 max-lg:hidden">Razdruži sektorje</span>
              </Button>
            </div>

            {/* Action: Sort */}
            <div className="flex cursor-pointer border-l border-l-neutral-300 px-4">
              <Select
                customTrigger={
                  <Button renderStyle="icon" className="flex">
                    <IconSort />
                    <span className="ml-2 max-lg:hidden">Uredi</span>
                  </Button>
                }
              >
                <Option id="1" value="1">
                  testing a long entry
                </Option>
                <Option id="2" value="2">
                  test2
                </Option>
                <Option id="3" value="3">
                  test3
                </Option>
              </Select>
            </div>
          </div>

          {/* Action: Search  */}
          <div className="min-w-0 max-xs:border-l max-xs:border-l-neutral-300 max-xs:pl-4 xs:w-80">
            <IconSearch className="xs:hidden" />
            <div className="max-xs:hidden">
              <TextField
                prefix={<IconSearch />}
                placeholder="Poišči po imenu"
                aria-label="Poišči po imenu"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Add notes if any...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CragTableActionsPage;
