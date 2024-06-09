import connectToDB from '@/app/database';
import Blog from '@/app/models/blog';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const EditBlog = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});

export async function PUT(req) {
	try {
		await connectToDB();
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({
				success: false,
				message: error.details[0].message,
			});
		}

		const { title, description } = await req.json();
		const { error } = EditBlog.validate({ title, description }, { new: true });

		const updateBlogDataID = await Blog.findOneAndUpdate({ _id: id }, { title, description }, { new: true });
		console.log('### updateBlogDataID : ', updateBlogDataID);
		if (updateBlogDataID) {
			return NextResponse.json({
				success: true,
				message: 'Blog is updated successfully.',
			});
		}

		if (error) {
			return NextResponse.json({
				success: false,
				message: 'Something went wrong! Please again later.',
			});
		} else {
			return NextResponse.json({
				success: false,
				message: 'Something went wrong! Please again later.',
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			success: false,
			message: 'Something went wrong! Please again later.',
		});
	}
}
