import {Button} from "@/components/ui/button";

const DeleteConfirmationDialog = ({
                                      isOpen,
                                      onConfirm,
                                      onCancel,
                                  }: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Delete Question</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete this question? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationDialog