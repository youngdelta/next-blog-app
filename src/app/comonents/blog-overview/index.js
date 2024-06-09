'use client';

import { Button } from '@/components/ui/button';
import { Suspense, useEffect, useState } from 'react';
import AddNewBlog from '../add-new-blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

function BlogOverview({ blogList }) {
	const [openBlogDialog, setOpenBlogDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [blogFormData, setBlogFormData] = useState({
		title: '',
		description: '',
	});
	const [currentEditedBlogID, setCurrentEditBlogId] = useState(null);

	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, []);

	const handleSaveBlog = async (e) => {
		try {
			setLoading(true);
			const apiResponse =
				setCurrentEditBlogId !== null
					? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, { method: 'PUT', body: JSON.stringify(blogFormData) })
					: await fetch('/api/add-blog', { method: 'POST', body: JSON.stringify(blogFormData) });
			const result = await apiResponse.json();

			console.log(result);

			if (result?.success) {
				setBlogFormData({ title: '', description: '' }); // init
				setOpenBlogDialog(false);
				setLoading(false);
				setCurrentEditBlogId(null);
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleDeleteBlogByID = async (id) => {
		try {
			const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
				method: 'DELETE',
			});
			const result = await apiResponse.json();

			if (result?.success) {
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			// throw new Error(error);
		}
	};

	const handleEdit = async (blogCurrentData) => {
		setCurrentEditBlogId(blogCurrentData?._id);
		setBlogFormData({
			title: blogCurrentData.title,
			description: blogCurrentData.description,
		});
		setOpenBlogDialog(true);
	};

	return (
		<div className="min-h-screen flex flex-col gap-10 justify-center items-center bg-gradient-to-t from-purple-500 to-blue-600">
			<Suspense fallback={<Loading />}>
				<AddNewBlog
					openBlogDialog={openBlogDialog}
					setOpenBlogDialog={setOpenBlogDialog}
					loading={loading}
					setLoading={setLoading}
					blogFormData={blogFormData}
					setBlogFormData={setBlogFormData}
					handleSaveBlog={handleSaveBlog}
					currentEditedBlogID={currentEditedBlogID}
					setCurrentEditBlogId={setCurrentEditBlogId}
				/>
			</Suspense>
			<Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
				{blogList && blogList.length > 0
					? blogList.map((b) => (
							<Card className="p-5">
								<CardContent>
									<CardTitle className="mb-5">{b?.title}</CardTitle>
									<CardDescription>{b?.description}</CardDescription>
									<div className="mt-5 flex gap-5  items-center">
										<Button onClick={(e) => handleEdit(b)}>Edit</Button>
										<Button onClick={(e) => handleDeleteBlogByID(b?._id)}>Delete</Button>
									</div>
								</CardContent>
							</Card>
					  ))
					: null}
			</div>
		</div>
	);
}

export default BlogOverview;
