import Image from "next/image";
export default async function Page() {
  return (
    <>
      <h1 className="pt-10 pb-2 font-bold border-b-2 mx-2">
        過去のグループ一覧
      </h1>
      <h2 className="mx-2 pt-2 font-bold">グループA</h2>
      <Image src="/IMG_4422.jpeg" alt="not found" width="414" height="896" />
    </>
  );
}
