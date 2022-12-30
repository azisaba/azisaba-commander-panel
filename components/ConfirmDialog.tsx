import React from "react";
import {Button, Dialog, DialogActions} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";

type ConfirmDialogProps = {
    open: boolean
    onClose: VoidFunction
    onConfirm: VoidFunction
    confirmText: string
    confirmColor: OverridableStringUnion<
        'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >
    children: React.ReactNode
}

export function ConfirmDialog(props: ConfirmDialogProps) {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth={"sm"}
            fullWidth
        >
            {props.children}
            <DialogActions>
                <Button
                    variant={"outlined"}
                    onClick={props.onClose}
                >
                    キャンセル
                </Button>
                <Button
                    variant={"contained"}
                    onClick={props.onConfirm}
                    color={props.confirmColor}
                >
                    {props.confirmText}
                </Button>
            </DialogActions>

        </Dialog>
    );
}