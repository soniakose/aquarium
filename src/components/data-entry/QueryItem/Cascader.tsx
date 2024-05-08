import './query-item.css'
import { GetProp } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import {
  Cascader as BaseCascader,
  Flex,
  ICascaderProps as IBaseCascaderProps,
  Input,
  Typography,
  Icon,
} from 'src/components'
import { Icons } from 'src/constants/Icons'

export interface CascaderOption {
  value: string
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export interface ICascaderProps {
  options: CascaderOption[]
  icon?: keyof Pick<typeof Icons, ("empty" | "events" | "userAttributes" | "eventAttribute")>
  errorMessage?: string
  placeholder?: string
  onChange?: (values: (number | string)[], selectedOptions: any) => Promise<void>
  value?: (number | string)[]
}

export const Cascader = (props: ICascaderProps) => {
  type DefaultOptionType = GetProp<IBaseCascaderProps, 'options'>[number]

  const options: CascaderOption[] = []
  const [items, setItems] = useState(props.options ?? options)
  const [searchValue, setSearchValue] = useState('')
  const [selectedValue, setSelectedValue] = useState<(number | string)[]>(props.value ?? [])
  const [selectedDisplayValue, setSelectedDisplayValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setItems(props.options)
  }, [props.options])

  const onSearch = (value: string) => {
    setSearchValue(value)
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  const baseProps: IBaseCascaderProps = {
    getPopupContainer: triggerNode => triggerNode.parentElement,
    searchValue: searchValue,
    value: selectedValue,
    onChange: (values: (number | string)[], selectedOptions: any): void => {
      setSelectedValue(values as string[])
      setSelectedDisplayValue(selectedOptions.slice(-1)[0].label)
      if (props.onChange) {
        props.onChange(values, selectedOptions)
      }
    },
    dropdownRender: menu => (
      <div className={'query-item__dropdown'}>
        <Input.Search allowClear className={'query-item__input-search'} placeholder="Search" onSearch={onSearch} />
        <Flex justify="center">{menu}</Flex>
      </div>
    ),
    showSearch: { filter },
    options: items,
    onDropdownVisibleChange: value => setIsOpen(value),
  }

  let inputClasses = `query-item`
  if (isOpen) inputClasses += ' query-item--open'
  if (selectedValue && selectedValue.length != 0) inputClasses += ' query-item--selected'
  if (props.errorMessage) inputClasses += ' query-item--error'

  return (
    <>
      <BaseCascader {...baseProps}>
        <Input
          readOnly={true}
          placeholder={props.placeholder}
          status={props.errorMessage ? 'error' : undefined}
          className={inputClasses}
          value={selectedDisplayValue ?? selectedValue.slice(-1)}
          prefix={props.icon ? <Icon name={props.icon} size="ms" color="primary" /> : <Icon name="empty" size="ms" color="primary" />}
        />
      </BaseCascader>
      {props.errorMessage && <Typography.Text type={'danger'}>{props.errorMessage}</Typography.Text>}
    </>
  )
}