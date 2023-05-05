import { Box, Input } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

type SearchFieldProps = {
    debounceDelay: number,
    isTyped: boolean
    onChange: Dispatch<SetStateAction<string>>
    setFocused: Dispatch<SetStateAction<boolean>>
}

export const SearchField = ({
    debounceDelay,
    isTyped,
    onChange,
    setFocused
}: SearchFieldProps) => {
    const [value, setValue] = useState('')
    const subjectRef = useRef<Subject<string>>()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)

        return subjectRef.current?.next(event.target.value)
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
                placeholder='The search starts with 3 entered characters, e.g. "bul"'
                data-testid="search"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <Search2Icon
                position="absolute"
                top="12px"
                left="10px"
                color={value?.length < 3 && isTyped ? 'red.400' : 'green.400'}
            />
        </Box>
    )
}
