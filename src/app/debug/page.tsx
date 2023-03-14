"use client";

import Header from "@/components/Header";
import { useUser } from "@/provider/AuthStateProvider";
import { createGroup, getGroup, getGroups, joinGroup } from "@/repo/group";
import { savePhoto, getPhoto } from "@/repo/photo";

export default function Page() {
  const user = useUser();
  return (
    <>
      <Header />
      <div className="pt-[64px] m-4">
        <h1 className="text-xl font-bold">Debug</h1>
        <section>
          <h2>createGroup</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={() => user != null && createGroup("hello", user.uid)}
          >
            {`createGroup("hello")`}
          </button>
        </section>
        <section className="mt-4">
          <h2>savePhoto</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={() =>
              savePhoto({
                groupId: "WUlZOnCsufIYp2z1p0ok",
                createdBy: "user-id",
                location: {
                  latitude: 35.6812,
                  longitude: 139.7671,
                },
                address: "九州",
                image:
                  "data:image/png;base64,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",
              })
            }
          >
            {`savePhoto()`}
          </button>
        </section>
        <section className="mt-4">
          <h2>joinGroup</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={() =>
              user != null && joinGroup("4xGsmi3DUTHRbuQ9y3CA", user.uid)
            }
          >
            {`joinGroup()`}
          </button>
        </section>
        <section className="mt-4">
          <h2>getGroup</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={async () => {
              const res = getGroup("4xGsmi3DUTHRbuQ9y3CA");
              console.log(res);
            }}
          >
            {`getGroup()`}
          </button>
        </section>
        <section className="mt-4">
          <h2>getGroups</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={async () => {
              if (user == null) {
                return;
              }
              const res = await getGroups(user.uid);
              console.log(res);
            }}
          >
            {`getGroups()`}
          </button>
        </section>
        <section className="mt-4">
          <h2>getPhoto</h2>
          <button
            className="mt-1 normal-case btn"
            onClick={async () => {
              const res = await getPhoto(
                "WUlZOnCsufIYp2z1p0ok",
                "0CdP_25P6Agek2w31ZK5N"
              );
              console.log(res);
            }}
          >
            {`getPhoto()`}
          </button>
        </section>
      </div>
    </>
  );
}
