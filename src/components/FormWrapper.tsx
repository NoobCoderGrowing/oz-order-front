import { CSSProperties, useState } from 'react';
import { Button, Form, Input } from 'antd';
import classes from './FormWrapper.module.css'
import { TableEntries } from './TypeDefinition';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

type Props = {
    setTableEntries: (entries:TableEntries[])=>void;
  }

function FormWrapper({setTableEntries}:Props) {
    type LayoutType = Parameters<typeof Form>[0]['layout'];
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('inline');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

    const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

    const [customerName, setCustomerName] = useState<string>('');
    const [customerPO, setCustomerPO] = useState<string>('');
    const [onfCO, setOnfCO] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState<string>('');

    const [nameColor, setNameColor] = useState<string>('gray');
    const [POColor, setPOColor] = useState<string>('gray');
    const [onfColor, setOnfColor] = useState<string>('gray');
    const [dateColor, setDateColor] = useState<string>('gray');
    const [warnVisible, setWarnVisible] = useState<String>('hidden');


    function custermerNameChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        let value = event.target.value
        let valid = /^[a-zA-Z0-9._/ ]*$/.test(value)
        if(valid){
            setNameColor('Green')
            setCustomerName(value);
        }else{
            setNameColor('Red')
            setWarnVisible('visible')
            setCustomerName('invalid')
        }
    }

    function custermerPOChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        let value = event.target.value
        let valid = /^[a-zA-Z0-9._/ ]*$/.test(value)
        if(valid){
            setPOColor('Green')
            setCustomerPO(value);
        }else{
            setPOColor('Red')
            setWarnVisible('visible')
            setCustomerPO('invalid');
        }
    }

    function onfCOChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        let value = event.target.value
        let valid = /^[a-zA-Z0-9._/ ]*$/.test(value)
        if(valid){
            setOnfColor('Green')
            setOnfCO(value);
        }else{
            setOnfColor('Red')
            setWarnVisible('visible')
            setOnfCO('invalid');
        }
    }

    function dateChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        let value = event.target.value;
        let valid = /^\d{4}-\d{2}-\d{2}$/.test(value)
        if(valid){
            setDateColor('Green')
            setDate(value);
        }else{
            setDateColor('Red')
            setWarnVisible('visible')
            setDate('invalid')
        }
        
    }

    function datePickerHandler(pickedDate: Date){
        const formatedDate = moment(pickedDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"); 
        setDate(formatedDate);
        setStartDate(pickedDate);
        setDateColor('Green');
    }

    function retriveOrders(){
        if(customerName=='invalid'||onfCO=='invalid'||customerPO=='invalid'||date=='invalid'||(customerName==''&&onfCO==''&&customerPO=='')){
            return;
        }
        let url = "http://8.222.181.202:8888/oz/order/retrieve?" 
        // let url = "https://wenjunblog.xyz:8080/oz/order/retrieve?" 
        // let url = "http://localhost:8080/oz/order/retrieve?" 
        fetch(url + new URLSearchParams({
            customerName: customerName,
            customerPO: customerPO,
            onfCO: onfCO,
            date: date,
        }),{
            method: 'GET',
        }).then(response => response.json()).then(data => {
            console.log(data)
            data.map((entry:any) =>{
                entry['key'] = entry['orderID']
            })
            setTableEntries(data)
        })
    }


  return (
    <>  
        <Form className={classes.formWrapper}
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
        >
            <Form.Item label="CUSTOMER NAME"/>
            <div className={classes.formEntry}>
                    <Input placeholder="Apple Ltd." onChange={custermerNameChangeHandler}/>
                    <div className={classes.nameWarn} style={{color:nameColor, visibility:warnVisible} as CSSProperties}>Only letters, digits, ".", "_", "/" and space are allowed.</div>
                </div>
            <Form.Item className={classes.formItem} label="CUSTOMER P.O."/>
            <div className={classes.formEntry}>
                    <Input placeholder="3345-02K3" onChange={custermerPOChangeHandler}/>
                    <div className={classes.POWarn} style={{color:POColor, visibility:warnVisible} as CSSProperties}>Only letters, digits, ".", "_", "/" and space are allowed.</div>
                </div>
            <Form.Item label="ONF C.O."/>
            <div className={classes.formEntry}>
                    <Input placeholder="3345-02K3" onChange={onfCOChangeHandler}/>
                    <div className={classes.onfWarn} style={{color:onfColor,visibility:warnVisible} as CSSProperties}>Only letters, digits, ".", "_", "/" and space are allowed.</div>
                 </div>
            <Form.Item label="DATE"/>
            <div className={classes.dateContainer}>
                    <Input placeholder={date} onChange={dateChangeHandler}/>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={datePickerHandler} />
            </div>
                <div style={{color:dateColor,visibility:warnVisible} as CSSProperties}>Format should be YYYY-MM-DD</div>
            <Form.Item {...buttonItemLayout}>
                <Button className={classes.formButton} type="primary" onClick={retriveOrders}>Retrieve Order</Button>
            </Form.Item>
        </Form>
        <p>Please input at least one field to retrive your order, excluding date.</p>
    </>
  )
}
export default FormWrapper
