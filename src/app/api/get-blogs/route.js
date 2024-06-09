import connectToDB from '@/app/database';
import Blog from '@/app/models/blog';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		console.log('### get-blogs : ');
		await connectToDB();
		const extractAllBlogsFromDatabase = await Blog.find({});
		console.log('### extractAllBlogsFromDatabase : ', extractAllBlogsFromDatabase);

		if (extractAllBlogsFromDatabase) {
			return NextResponse.json({
				success: true,
				data: extractAllBlogsFromDatabase,
			});
		} else {
			return NextResponse.json({
				success: false,
				message: 'Something went wrong! Please try again later.',
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			success: false,
			message: 'Something went wrong! Please try again later.',
		});
	}
}
