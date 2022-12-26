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