"use client";
import * as React from "react";

const WALLET = [
  { name: "checking", color: "from-sky-200 to-sky-100" },
  { name: "savings", color: "from-sky-500 to-sky-300" },
  { name: "investing", color: "from-sky-800 to-sky-600" },
];

export function Wallet() {
  const [activeCard, setActiveCard] = React.useState<string | null>(null);

  return (
    <div className="grid grid-rows-3 w-full h-full mt-4 px-2 border-b-2 border-black">
      {WALLET.map((item) => (
        <WalletItem
          key={item.name}
          name={item.name}
          className={item.color}
          isActive={item.name === activeCard}
          onCardChange={(newCard: string) => setActiveCard(newCard)}
        />
      ))}
    </div>
  );
}

type WalletItemProps = {
  name: string;
  className: string;
  isActive?: boolean;
  onCardChange: (newCard: string | null) => void;
};
function WalletItem(props: WalletItemProps) {
  const { name, className, isActive, onCardChange } = props;

  return (
    <button
      type="button"
      className={`text-left rounded-t-lg -mt-4 p-2 from-inherit bg-gradient-to-tr ${className} ${
        isActive && "row-span-2"
      }`}
      onClick={() => onCardChange(isActive ? null : name)}
    >
      {name}
    </button>
  );
}
