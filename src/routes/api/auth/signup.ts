import { auth } from "$lib/lucia";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();
    if (!email || !password) return { status: 400 };

    try {
        const createUser = await auth.createUser("email", email, {
            password,
            user_data: {
                email,
            },
        });
        return {
            status: 302,
            headers: {
                "set-cookie": createUser.cookies,
                location: "/",
            },
        };
    } catch (e) {
        const error = e as Error;
        if (
            error.message === "AUTH_DUPLICATE_IDENTIFIER_TOKEN" ||
            error.message === "AUTH_DUPLICATE_USER_DATA"
        ) {
            return {
                status: 400,
                body: {
                    error: "Email already in use.",
                },
            };
        }
        return {
            status: 500,
            body: {
                error: "Unknown error.",
            },
        };
    }
};