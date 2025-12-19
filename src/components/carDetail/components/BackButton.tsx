interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-200"
  >
    ← Back to Cars
  </button>
);

export default BackButton;
