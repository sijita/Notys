import NotesCard from "./NotesCard";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { searchState } from "../../atoms/searchState";
import { notesFilterState } from "../../atoms/notesFilterState";
import { userDataState } from "../../atoms/userDataState";

export default function NotesBody() {
  const { userId } = useRecoilValue(userDataState);
  const order = useRecoilValue(notesFilterState);
  const { data: notes, error } = useSWR<any[]>(
    userId ? `rest/v1/Notes?user_id=eq.${userId}${order}` : null
  );
  
  const search = useRecoilValue(searchState);

  const notesResults = !search
    ? notes
    : notes?.filter((item) =>
        item.title
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(search.replace(/\s+/g, "").toLowerCase())
      );

  return (
    <div className="bg-neutral-900/70 rounded-md p-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
      {!error ? (
        notesResults?.length ? (
          notesResults?.map((note, index) => (
            <NotesCard
              key={index}
              id={note.id}
              title={note.title}
              content={note.content}
              date={note.created_at}
            />
          ))
        ) : (
          <p className="text-2xl">No hay notas</p>
        )
      ) : (
        <p className="text-2xl">Error al cargar las notas</p>
      )}
    </div>
  );
}
