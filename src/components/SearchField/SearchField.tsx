import { Box, Input } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

type SearchFieldProps = {
    setSearchValue: Dispatch<SetStateAction<string>>
    debounceDelay: number
}

export const SearchField = ({
    setSearchValue,
    debounceDelay
}: SearchFieldProps) => {
    const [isShowIcon, setIsShowIcon] = useState(true)
    const [value, setValue] = useState('')
    const subjectRef = useRef<Subject<string>>()

    const setIconVisibility = () => {
        if (!value) {
            setIsShowIcon(true)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIconVisibility()
        setValue(event.target.value)

        return subjectRef.current?.next(event.target.value)
    }

    useEffect(() => {
        if (debounceDelay && setSearchValue) {
            const subject = new Subject<string>()

            subjectRef.current = subject
            subject.pipe(debounceTime(debounceDelay)).subscribe({
                next: setSearchValue
            })
        }
    }, [])

    return (
        <Box
            position="relative"
        >
            <Input
                onFocus={() => setIsShowIcon(false)}
                onBlur={setIconVisibility}
                onChange={handleInputChange}
                paddingLeft="30px"
                placeholder="Type the Pokemon's name"
                data-testid="search"
            />
            {isShowIcon && !value && <Search2Icon
                position="absolute"
                top="12px"
                left="10px"
            />}
        </Box>
    )
}
