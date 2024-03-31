import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function DialogGenerate({
                                         isOpen,
                                         onClose,
                                           inputValue,
                                           onInputChange
                                     }: {
    isOpen: boolean;
    onClose: () => void;
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className={"flex min-h-full items-center justify-center p-4 text-center "}>
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
                            <Dialog.Panel className="flex justify-between relative transform overflow-hidden px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-auto sm:w-full sm:max-w-md text-2xl font-medium text-white whitespace-nowrap rounded-2xl border border-solid backdrop-blur-[7.5px] bg-white bg-opacity-10 border-neutral-500 max-w-[500px]">
                                <input type="text" placeholder="how to Master HTMl"
                                       value={inputValue}
                                       onChange={onInputChange}
                                       className="text-white bg-transparent	border-none outline-none flex gap-5 justify-between px-6 py-5  max-md:flex-wrap max-md:px-5" />

                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df8e5812c9609d70bfe78cb39566d5bc2917f52d472a0f20b6996093a1ca3aa3?"
                                    className="shrink-0 my-auto w-8 aspect-[1.18] fill-neutral-500"
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
