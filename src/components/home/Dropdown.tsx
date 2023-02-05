interface UserPerfilProps {
  icon: JSX.Element;
  items: JSX.Element;
  iconClassName?: string;
  dropdownUbi?: string;
}

export default function Dropdown({
  icon,
  items,
  iconClassName,
  dropdownUbi,
}: UserPerfilProps) {
  return (
    <div className={`dropdown ${dropdownUbi}`}>
      <label
        tabIndex={0}
        className={`${iconClassName} bg-transparent hover:bg-neutral-900 rounded-md`}
      >
        {icon}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-neutral-900 text-white rounded-md w-52 flex flex-col gap-2"
      >
        {items}
      </ul>
    </div>
  );
}
