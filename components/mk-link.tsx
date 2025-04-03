import Link from "next/link"
import React, { AnchorHTMLAttributes, ClassAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

export default function MkLink(props: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
    return (
        <Link href={props.href || "#"}>{props.children}</Link>
    )
}