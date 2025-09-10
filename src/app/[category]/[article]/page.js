import Viewblog from "@/components/viewblog";

export default async function Article({ params: { article } }) {
  return (
    <div className="h-screen p-10 bg-neuBase overflow-y-auto">
        <Viewblog article={article} />
    </div>
  );
}
