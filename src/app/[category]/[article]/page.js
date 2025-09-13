import Viewblog from "@/components/viewblog";

export default async function Article({ params: { article } }) {
  return (
    <div className="h-[calc(100vh-7rem)] p-10 bg-neuBase dark:bg-neuBaseDark overflow-y-auto">
        <Viewblog article={article} />
    </div>
  );
}
