interface SwapProps {
  swapOn: JSX.Element;
  swapOff: JSX.Element;
  buttonOn: () => void;
  buttonOff: () => void;
}

export default function Swap({
  swapOn,
  swapOff,
  buttonOn,
  buttonOff,
}: SwapProps) {
  return (
    <label className="swap btn bg-transparent hover:bg-[#080808] w-full sm:w-auto">
      <input type="checkbox" />
      <div
        onClick={buttonOn}
        className="swap-on flex items-center gap-5 normal-case"
      >
        {swapOn}
      </div>
      <div
        onClick={buttonOff}
        className="swap-off flex items-center gap-5 normal-case"
      >
        {swapOff}
      </div>
    </label>
  );
}
