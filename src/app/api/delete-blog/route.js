import connectToDB from '@/app/database';
import Blog from '@/app/models/blog';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
	try {
		await connectToDB();
		const { searchParams } = new URL(req.url);
		const getCurrentBlogID = searchParams.get('id');

		if (!getCurrentBlogID) {
			return NextResponse.json({
				success: false,
				message: 'Blog ID is required',
			});
		}
		const deleteCurrentBlogID = await Blog.findByIdAndDelete(getCurrentBlogID);

		if (deleteCurrentBlogID) {
			return NextResponse.json({
				success: true,
				message: 'Blog is deleted successfully',
			});
		}
	} catch (error) {
		console.error(error);
		// throw new Error(error);
		return NextResponse.json({
			success: false,
			message: 'Something went wring! Please again later.',
		});
	}
}
