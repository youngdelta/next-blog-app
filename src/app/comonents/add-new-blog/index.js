'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

function AddNewBlog({
	openBlogDialog,
	setOpenBlogDialog,
	loading,
	setLoading,
	blogFormData,
	setBlogFormData,
	handleSaveBlog,
	currentEditedBlogID,
	setCurrentEditBlogId,
}) {
	return (
		<>
			<Dialog
				open={openBlogDialog}
				onOpenChange={() => {
					setOpenBlogDialog(false);
					setBlogFormData({
						title: '',
						description: '',
					});
					setCurrentEditBlogId(null);
				}}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{currentEditedBlogID ? 'Edit' : 'Add New'} Blog</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								name="title"
								placeholder="Enter blog title"
								id="title"
								value={blogFormData.title}
								className="col-span-3"
								autoComplete="one-time-code"
								onChange={(event) => {
									setBlogFormData({ ...blogFormData, title: event.target.value });
								}}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								name="description"
								id="description"
								value={blogFormData.description}
								className="col-span-3"
								autoComplete="one-time-code"
								onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" onClick={handleSaveBlog}>
							{loading ? 'Saving changes' : 'Save changes'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AddNewBlog;
