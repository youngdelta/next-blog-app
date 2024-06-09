import BlogOverview from '../comonents/blog-overview';

async function fetchListOfBlogs() {
	try {
		const apiResponse = await fetch(``, {
			method: 'GET',
			cache: 'no-store',
		});
		const result = await apiResponse.json();
		console.log('### result : ', result);
		return result?.data;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

export default async function Blogs() {
	const blogList = await fetchListOfBlogs();

	return (
		<>
			<BlogOverview blogList={blogList} />
		</>
	);
}
