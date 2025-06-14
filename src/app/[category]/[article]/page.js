import Viewblog from "@/components/viewblog";


export default async function Article({ params: { article } }) {
 
  
    return (
      <Viewblog article={article} />
    );
}