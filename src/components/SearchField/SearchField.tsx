import React from 'react'
import { Box, Input } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { SEARCH_VALUE_MIN_LENGTH } from "../../helpers/constants"

type SearchFieldProps = {
    debounceDelay: number,
    isTyped: boolean
    onChange: Dispatch<SetStateAction<string>>
    setFocused: Dispatch<SetStateAction<boolean>>
}

export const SearchField: React.FC<SearchFieldProps> = ({
    debounceDelay,
    isTyped,
    onChange,
    setFocused
}) => {
    const [value, setValue] = useState('')
    const subjectRef = useRef<Subject<string>>()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event?.target?.value?.trim())

        return subjectRef.current?.next(event?.target?.value?.trim())
    }

    useEffect(() => {
        if (debounceDelay && onChange) {
            const subject = new Subject<string>()

            subjectRef.current = subject
            subject.pipe(debounceTime(debounceDelay)).subscribe({
                next: onChange
            })
        }
    }, [])

    return (
        <Box
            position="relative"
        >
            <Input
                onChange={handleInputChange}
                paddingLeft="30px"
                placeholder={`The search starts with ${SEARCH_VALUE_MIN_LENGTH} entered characters, e.g. "bul"`}
                data-testid="search"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <Search2Icon
                position="absolute"
                top="12px"
                left="10px"
                color={value?.length < SEARCH_VALUE_MIN_LENGTH && isTyped ? 'red.400' : 'green.400'}
            />
        </Box>
    )
}
