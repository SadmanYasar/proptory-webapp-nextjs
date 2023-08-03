import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
    const { data } = useSession()

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}