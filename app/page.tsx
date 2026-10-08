import UserMoney from "@/components/counterMoney/page";
import MovementMoney from "@/components/spent/page";

export default function Home({children}: {children: React.ReactNode}) {
  return (
    <>
      <UserMoney>
        {children}
        <MovementMoney></MovementMoney>
      </UserMoney>
    </>
  );
}