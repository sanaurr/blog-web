import Viewblog from "@/components/viewblog";

export default async function Article({ params: { article } }) {
  return (
    <div className="h-screen p-10 bg-neuBase dark:bg-neuBaseDark overflow-y-auto">
        <Viewblog article={article} />
    </div>
  );
}
