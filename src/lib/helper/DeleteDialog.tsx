import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
const DeleteDialog = ({
  openOrNot,
  label,
  onCancelClick,
  onOKClick,
  deleteLoading,
  buttonLable,
}: {
  openOrNot: boolean;
  label: any;
  onCancelClick: () => void;
  onOKClick: () => void;
  deleteLoading: boolean;
  buttonLable?: string;
}) => {
  return (
    <AlertDialog open={openOrNot}>
      <AlertDialogContent className="bg-white text-gray-700 max-w-110 gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-700 text-md leading-relaxed 3xl:text-lg font-normal flex items-center justify-around gap-2">
            {label}
            <button
              className="w-7 h-7 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer"
              onClick={onCancelClick}
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            className="font-normal h-8 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:outline-0"
            onClick={onCancelClick}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500 text-white  h-8 font-normal cursor-pointer"
            onClick={onOKClick}
          >
            {deleteLoading
              ? "Deleting..."
              : buttonLable?.toUpperCase() || "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteDialog;
