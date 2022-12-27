
type ContainerConsoleProps = {
    container: Container,
    isDisplay: boolean
}

export function ContainerConsole(props: ContainerConsoleProps) {

    return (
        <>
            <div
                hidden={!props.isDisplay}
            >
                Console
            </div>
        </>
    )
}