import PostFeed from '@/components/PostFeed';
import UserProfile from '@/components/UserProfile';
import { getUserPosts, getUserWithUsername } from '@/lib/getUserWithUsername';


export default async function PostPage({ params }: {  params: { slug: string }; }) {
    const username = params.slug;
    const user = await getUserWithUsername(username);
    const posts =  await getUserPosts();

    return (
      <main>
        <h1>Post Page</h1>
        <UserProfile user={user} />
        <PostFeed posts={posts} />
      </main>
    )
  }