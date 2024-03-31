import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SearchLinks from "@/api/getBrowserData";

type Link = {
  title: string;
  link: string;
};

export default function DialogCustom({
  isOpen,
  onClose,
  title,
  info,
  links,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  info: string;
  links: Link[];
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* Removed the Transition.Child responsible for the dimmed background */}

        <div className="fixed inset-0 z-10 overflow-y-auto">
          {/* Adjusted positioning to bottom right for desktops with TailwindCSS */}
          <div className="flex min-h-full items-end justify-end p-4 text-center sm:items-center sm:justify-end sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* Adjusted max width for better desktop appearance and set to auto margin for all sides within sm:my-auto */}
              <Dialog.Panel className="relative transform overflow-hidden px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-auto sm:w-full sm:max-w-md">
                <div className="flex max-w-[391px] flex-col rounded-2xl border border-solid border-neutral-700 bg-neutral-800 px-8 py-8 text-xl font-bold text-white shadow-lg md:mt-32 lg:mt-40">
                  <div className="flex gap-5 whitespace-nowrap py-1 text-5xl font-extrabold">
                    <div className="divide-y-1 flex-auto">{title}</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d55b3d9b0ec04c12ba6847109dbc063646ed58d6c39c98ecc927449b0981308?"
                      className="aspect-square w-[15px] shrink-0 cursor-pointer self-start fill-white"
                      onClick={onClose}
                    />
                  </div>
                  <hr className="my-3 border-[#373737]" />
                  <div>Info</div>
                  <div className="mt-4 pb-2 pt-1 text-base font-light">
                    {info} <br />{" "}
                  </div>
                  <hr className="my-3 border-[#373737]" />
                  <div>Links</div>
                  <div className="mt-4 text-base font-light underline">
                    {links &&
                      Array.isArray(links) &&
                      links.slice(0, 5).map((link, index) => (
                        <Fragment key={index}>
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.title}
                          </a>
                          {index < links.length - 1 ? <br /> : null}
                        </Fragment>
                      ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
