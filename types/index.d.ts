declare type Permission = {
    id: string
    name: string
    content: PermissionContent[]
}

declare type PermissionContent = {
    project: string
    service: string
}

declare type User = {
    id: number
    username: string
    group: string
}

/**
 *  Container Type
 *  id: docker container id
 *  docker_id: docker id
 */
declare type Container = {
    id: string
    name: string
    docker_id: string
    docker_name: string
    created_at: string
    project_name: string
    service_name: string
    status: ContainerStatus
}

/**
 *  ContainerStatus Type
 */
declare type ContainerStatus = {
    read_at: string
    state: {
        status: string,
        started_at: string,
        finished_at: string
    }
    network_stats: {
        tx_total_byte: number,
        tx_byte_per_sec: number,
        tx_total_packet: number,
        tx_packet_per_sec: number,
        rx_total_byte: number,
        rx_byte_per_sec: number,
        rx_total_packet: number,
        rx_packet_per_sec: number
    }
    memory_stats: {
        usage: number,
        limit: number,
        percent: number
    }
    cpu_stats: {
        percent: number
    }
}

/**
 *  ContainerLogs Type
 */
declare type ContainerLogs = {
    read_at: number
    logs: string
}
