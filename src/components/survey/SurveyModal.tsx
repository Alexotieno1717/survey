"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type SurveyModalProps = {
    isOpen: boolean; // `isOpen` should be a boolean indicating if the modal is visible.
    onClose: () => void; // `onClose` is a function that closes the modal, with no arguments and no return value.
};

const SurveyModal = ({ isOpen, onClose }: SurveyModalProps  ) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-40" />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <DialogTitle className="text-lg font-bold text-gray-900">
                        Create Survey With AI
                    </DialogTitle>
                    <form>
                        <div className="space-y-4">
                            {/* Survey Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Survey Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter survey title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    What FAQ&#39;s would do you like!!
                                </label>
                                <textarea
                                    rows={10}
                                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Describe the FAQ's Questions you want the AI to Generate...... "
                                >
                                </textarea>
                            </div>

                            {/*/!* Status *!/*/}
                            {/*<div>*/}
                            {/*    <label className="block text-sm font-medium text-gray-700">*/}
                            {/*        Status*/}
                            {/*    </label>*/}
                            {/*    <select*/}
                            {/*        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"*/}
                            {/*    >*/}
                            {/*        <option value="active">Active</option>*/}
                            {/*        <option value="inactive">Inactive</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-survey-green rounded-lg"
                            >
                                Proceed Creating Survey
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default SurveyModal;
