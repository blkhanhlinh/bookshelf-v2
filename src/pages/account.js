import Head from 'next/head'
import { Header } from '@/components/Header'
import { DesktopLayout } from '@/components/Layout'
import { useContext } from 'react'
import AuthContext from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

export default function Login() {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<title>My account</title>
			</Head>
			<DesktopLayout>
				<Header />
                My account
			</DesktopLayout>
		</>
	)
}
