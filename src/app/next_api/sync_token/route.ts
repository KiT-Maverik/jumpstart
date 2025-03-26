import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { cookieKey } from 'api/constants'

export async function POST(request: Request) {
	const { token } = await request.json();
	const { set } = await cookies();

	if (!token) {
		return NextResponse.json({ error: "Token is required" }, { status: 400 });
	}

	set(cookieKey.synced_token, token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});

	return NextResponse.json({ success: true });
}

export async function DELETE() {
	const { delete: deleteCookie } = await cookies();

	deleteCookie(cookieKey.synced_token);

	return NextResponse.json({ success: true, status: 204 });
}
