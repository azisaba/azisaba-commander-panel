type FetchMethod = "GET" | "POST" | "PATCH" | "DELETE"

export const fetchData = async (url: string, method: FetchMethod, data?: object, token?: string, clientSideIP?: string): Promise<any | undefined> => {
    try {
        let baseRequest: RequestInit = {
            method: method,
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
        }

        if(token) {
            // @ts-ignore
            baseRequest.headers['x-azisabacommander-session'] = token
        }

        if (clientSideIP) {
            // @ts-ignore
            baseRequest.headers['client-side-ip'] = clientSideIP
        }

        if (method != "GET")
        {
            baseRequest.body = JSON.stringify(data)
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, baseRequest)

        return {
            response_status: response.status,
            ...await response.json()
        }

    } catch (e: any) {
        console.log(e)
        return undefined
    }


}
