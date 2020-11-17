import React from 'react'
import {TitleText} from './TitleStyled'

export default function Title(props) {
    return (
    <TitleText>{props.children}</TitleText>
    )
}
