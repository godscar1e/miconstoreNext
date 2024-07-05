'use client'

import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            response.status === 201 && router.push('/login')
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="name" name="name" id="name" />

                <label>Email</label>
                <input type="email" name="email" id="email" />

                <label>Password</label>
                <input type="text" name="password" id="password" />

                <button type="submit">Register</button>
            </form>
        </div >
    );
}
