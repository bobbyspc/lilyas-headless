"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "./shopify/client";
import {
    CUSTOMER_ACCESS_TOKEN_CREATE,
    GET_CUSTOMER,
} from "./shopify/mutations";

type CustomerAccessTokenCreateResponse = {
    customerAccessTokenCreate: {
        customerAccessToken: {
            accessToken: string;
            expiresAt: string;
        } | null;
        customerUserErrors: Array<{
            code: string;
            field: string[];
            message: string;
        }>;
    };
};

type GetCustomerResponse = {
    customer: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string;
        displayName: string;
    } | null;
};

export async function wholesaleLogin(
    _prevState: { error: string | null },
    formData: FormData
): Promise<{ error: string | null }> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    try {
        const data = await shopifyFetch<CustomerAccessTokenCreateResponse>({
            query: CUSTOMER_ACCESS_TOKEN_CREATE,
            variables: { input: { email, password } },
            cache: "no-store",
        });

        const { customerAccessToken, customerUserErrors } =
            data.customerAccessTokenCreate;

        if (customerUserErrors.length > 0) {
            return { error: customerUserErrors[0].message };
        }

        if (!customerAccessToken) {
            return { error: "Invalid email or password." };
        }

        const cookieStore = await cookies();
        cookieStore.set("wholesale_token", customerAccessToken.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(customerAccessToken.expiresAt),
        });

        return { error: null };
    } catch {
        return { error: "Something went wrong. Please try again." };
    }
}

export async function wholesaleLogout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("wholesale_token");
}

export async function getWholesaleCustomer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("wholesale_token")?.value;

    if (!token) return null;

    try {
        const data = await shopifyFetch<GetCustomerResponse>({
            query: GET_CUSTOMER,
            variables: { customerAccessToken: token },
            cache: "no-store",
        });

        return data.customer;
    } catch {
        return null;
    }
}
