import React, {useState, useEffect } from 'react'
import { 
    View, 
    ScrollView,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import { Text, Card, Input, Picker, Modal, Button } from "../../components";

import { sizes, colors } from '../../constants/theme';
import {server} from '../../constants/init';

const {width, height} = Dimensions.get('window')

// const token = '1MNtMnHTUatGJKtlpqNnOGLxi6PRnnD3BtsUdiYM8IfauMHI2Z';

const ScreeningProcess = ({navigation}) => {
    navigation.setOptions({
        title:'Prosess Screening',
        headerRight: null,
    })

    const [isLoading, setIsLoading] = useState('0')
    const [active, setActive] = useState('1')
    const [modal, setModal] = useState({visible:false, message:'', header:''})
    const [searchKtp, setSearchKtp] = useState('')
    const [icons, setIcons] = useState({
        error:<AntDesign name="closecircleo" size={30} color="white"/>,
        success:<AntDesign name="checkcircleo" size={30} color="white"/>,
        picture:<AntDesign name="picture" size={30} color="white"/>,
        form:<AntDesign name="form" size={30} color="white"/>
    })

    const [data, setData] = useState({
        desa: "",
        dusun: "",
        jenis_kelamin: "",
        kabupaten: "",
        kecamatan: "",
        nama: "",
        negara: "",
        no_identitas: "",
        provinsi: "",
        rt_rw: "",
        jenis_identitas:"ktp",
        id_screening:"SRC_"+new Date().getTime()
      })


    const [dataPicker, setDataPicker] = useState({
        jenis_identitas:[
            { label:'KTP', value:'ktp' },
            { label:'SIM', value:'sim' },
            { label:'Kartu Pelajar', value:'kartu pelajar' },
            { label:'Pasport', value:'pasport' },
        ],
        negara:[{label:'Indonesia', value:'indonesia'}],
        provinsi:[],
        kabupaten:[],
        kecamatan:[],
        desa:[],
        jenis_kelamin:[
            {label:'Pria', value:'pria'},
            {label:'Wanita', value:'wanita'}
        ],
    })

    const onChange = (name, value) => {
        let newData = {...data, [name]:value}
        setData(newData)
    }

    const onChangeValue = (name, value) => {
        let newData = {...data, [name]:value}
        setData(newData)

        getDataWilayah(name, value)
    }

    const getDataWilayah = async (name, id) => {
        const wilayah = {negara:'provinsi', provinsi:'kabupaten', kabupaten:'kecamatan', kecamatan:'desa'}
        
        if (id=='') {
            return setDataPicker({...dataPicker, [wilayah[name]]:[]})
        }

        let url_api='';
        if (wilayah[name]) {
            url_api = server.url+'/wilayah/'+wilayah[name]+'/'+id;
        }

        // console.log(url_api)
        const res = await axios.get(url_api);
        if (res.data.status === 'success') {
            
            await setDataPicker({...dataPicker, [wilayah[name]]:res.data.data})
            // console.log(wilayah[name], dataPicker)
        }
    }

    const openModal = (header, message) => {
        setModal({...modal, header, message, visible:true})
    }

    const closeModal = () => {
        setModal({...modal, visible:false})
    }

    const submitData = async () => {
        try {
            setIsLoading('3')

            let dataEmpty = Object.keys(data).filter(item => data[item]=="");

            if (dataEmpty.length>0) {
                setIsLoading('0')
                return openModal(icons.form, 'Data yang anda masukkan belum lengkap. \nSilahkan lengkapi data peserta screening')
            }

            const response = await axios.post(`${server.url}/screening`, {...data});
            if (response.data.status=='success') {
                
                setIsLoading('0')
                resetData()
                return openModal(icons.success, 'Data peserta screening berhasil ditambahkan')
            }

        } catch (error) {
            setIsLoading('0')
            openModal(icons.error, error)
        }
    }

    const resetData = () => {
        setData({
            no_identitas:'', 
            jenis_identitas:'ktp', 
            nama:'', 
            jenis_kelamin:'', 
            negara:'', 
            provinsi:'', 
            kabupaten:'', 
            kecamatan:'', 
            desa:'', 
            dusun:'', 
            rt_rw:'',
            id_screening:"SRC_"+new Date().getTime()
        })
    }

    const deleteData = async () => {
        try {
            if (data.no_identitas == '') {
                setIsLoading('0')
                return openModal(icons.success, 'Gagal Menghapus Data!\nNomer Identitas Kosong')
            }
            setIsLoading('2')
            const response = await axios.delete(`${server.url}/screening?id=${data.no_identitas}`);

            if (response.data.status=='success') {
                setIsLoading('0')
                return openModal(icons.success, 'Data peserta screening berhasil dihapus')
            }
            setIsLoading('0')

            resetData()
            openModal(icons.error, 'Data gagal dihapus')
        } catch (error) {
            setIsLoading('0')
            openModal(icons.error, error)
        }
    }

    const searcIdentitas = async () =>{
        
        if (searchKtp=='') {
           setIsLoading('0')
           return openModal(icons.error, 'Data Nomer Ktp Yang Dicari Kosong!')
        }

        setIsLoading('1');

        const res = await axios.get(`${server.url}/screening?id=${searchKtp}`);

        if (res.data.status == 'failed') {
            return openModal(icons.error, 'Data tidak berhasil ditemukan \nSilahkan lakukan pengisian data secara manual')
        }
        
        setData({...res.data.data, no_identitas: searchKtp})
        setIsLoading('0')
        return openModal(icons.error, 'Selamat data peserta screening berhasil ditemukan \nSilahkan lanjutkan aktivitas screening')
    }

    const checkData = async () => {
        const res = await axios.get(`${server.url}/screening?id=${data.no_identitas}`);
        
        if (res.data.status == 'success') {
            resetData()
            return openModal(icons.error, 'Data tidak bisa dimasukkan karena peserta sudah pernah mengikuti screening. \nSilahkan lanjutkan ke peserta yang lain')
        }
    }

    const renderFormKtp = () => {
        return (
            <>
                <View style={styles.formSearch}>
                    <Input 
                        name="searchKtp"
                        onChangeText={text => setSearchKtp(text)}
                        value={searchKtp}
                        style={[styles.input]}
                        inputType="numeric"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />
                    <View style={{height:'100%'}}>
                        <Button 
                            style={styles.btnSearch}
                            onPress={searcIdentitas}
                        >
                            {isLoading=='1' ? <ActivityIndicator size="small" color="white"/> : <Text font white transform="uppercase">KTP</Text>}
                        </Button>
                    </View>
                </View>
                <View style={styles.form}>
                    <Text bold>Data Identitas</Text>
                    <Input 
                        name="no_identitas"
                        label="No KTP"
                        onChange={onChange}
                        onBlur={checkData}
                        value={data.no_identitas}
                        style={styles.input}
                        inputType="numeric"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />
                    <Input 
                        name="nama"
                        label="Nama"
                        onChange={onChange}
                        value={data.nama}
                        style={styles.input}
                        inputType="default"
                        placeholder="Masukkan Nama"
                    />
                    <Picker 
                        name="jenis_kelamin"
                        label="Jenis Kelamin"
                        data={dataPicker.jenis_kelamin}
                        selectedValue={data.jenis_kelamin}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />
                    <Picker 
                        name="negara"
                        label="Negara"
                        data={dataPicker.negara}
                        selectedValue={data.negara}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="provinsi"
                        label="Provinsi"
                        data={dataPicker.provinsi}
                        selectedValue={data.provinsi}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="kabupaten"
                        label="Kota / Kabupaten"
                        data={dataPicker.kabupaten}
                        selectedValue={data.kabupaten}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="kecamatan"
                        label="Kecamatan"
                        data={dataPicker.kecamatan}
                        selectedValue={data.kecamatan}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />
                    
                    <Picker 
                        name="desa"
                        label="Desa / Kelurahan"
                        data={dataPicker.desa}
                        selectedValue={data.desa}
                        onChange={onChange}
                        style={styles.picker}
                    />

                    <Input 
                        name="dusun"
                        label="Dusun"
                        onChange={onChange}
                        value={data.dusun}
                        style={[styles.input]}
                        inputType="default"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />

                    <Input 
                        name="rt_rw"
                        label="RT / RW"
                        onChange={onChange}
                        value={data.rt_rw}
                        style={[styles.input]}
                        inputType="default"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />

                </View>

                <Button 
                    style={[styles.btnActive, {width:'100%'}]}
                    onPress={()=> {}}
                >
                    <Text font bold transform="uppercase" white>Screening Now</Text>
                </Button>

                <View style={styles.btnTab}>
                    <Button 
                        style={{flex:0.48, backgroundColor:colors.red}}
                        onPress={deleteData}
                    >
                        {isLoading=='2' ? <ActivityIndicator size="small" color="white"/> :<Text font bold transform="uppercase" white>Hapus</Text>}
                    </Button>
                    <Button 
                        style={{flex:0.48, backgroundColor:colors.blue}}
                        onPress={submitData}
                    >
                        {isLoading=='3' ? <ActivityIndicator size="small" color="white"/> :<Text font bold transform="uppercase" white>next</Text>}
                    </Button>
                </View>
            </>
        )
    }

    const renderFormNonKtp = () => {
        return (
            <>
                
                <View style={styles.form}>
                    <Text bold>Data Identitas</Text>
                    <Picker 
                        name="jenis_identitas"
                        label="Identitas"
                        data={dataPicker.jenis_identitas}
                        selectedValue={data.jenis_identitas}
                        onChange={onChange}
                        style={styles.picker}
                    />
                    <Input 
                        name="no_identitas"
                        label="No Identitas"
                        onChange={onChange}
                        onBlur={checkData}
                        value={data.no_identitas}
                        style={styles.input}
                        inputType="numeric"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />
                    <Input 
                        name="nama"
                        label="Nama"
                        onChange={onChange}
                        value={data.nama}
                        style={styles.input}
                        inputType="default"
                        placeholder="Masukkan Nama"
                    />
                    <Picker 
                        name="jenis_kelamin"
                        label="Jenis Kelamin"
                        data={dataPicker.jenis_kelamin}
                        selectedValue={data.jenis_kelamin}
                        onChange={onChange}
                        style={styles.picker}
                    />
                    <Picker 
                        name="negara"
                        label="Negara"
                        data={dataPicker.negara}
                        selectedValue={data.negara}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="provinsi"
                        label="Provinsi"
                        data={dataPicker.provinsi}
                        selectedValue={data.provinsi}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="kabupaten"
                        label="Kota / Kabupaten"
                        data={dataPicker.kabupaten}
                        selectedValue={data.kabupaten}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Picker 
                        name="kecamatan"
                        label="Kecamatan"
                        data={dataPicker.kecamatan}
                        selectedValue={data.kecamatan}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />
                    
                    <Picker 
                        name="desa"
                        label="Desa / Kelurahan"
                        data={dataPicker.desa}
                        selectedValue={data.desa}
                        onChange={onChangeValue}
                        style={styles.picker}
                    />

                    <Input 
                        name="dusun"
                        label="Dusun"
                        onChange={onChange}
                        value={data.dusun}
                        style={[styles.input]}
                        inputType="default"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />

                    <Input 
                        name="rt_rw"
                        label="RT / RW"
                        onChange={onChange}
                        value={data.rt_rw}
                        style={[styles.input]}
                        inputType="default"
                        placeholder="Masukkan Nomer KTP(Syncron)"
                    />

                </View>
                <Button 
                    style={[styles.btnActive, {width:'100%'}]}
                    onPress={()=> alert('Belum Tersedia')}
                >
                    <Text font bold transform="uppercase" white>Screening Now</Text>
                </Button>

                <Button 
                    style={{width:'100%', backgroundColor:colors.blue, marginVertical:10}}
                    onPress={submitData}
                >
                    {isLoading=='3' ? <ActivityIndicator size="small" color="white"/> :<Text font bold transform="uppercase" white>next</Text>}
                </Button>
            </>
        )
    }

    return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
            
                    <Card style={styles.card}>
                        <Text h2 regular transform="uppercase">screen id</Text>
                        <Text h2 bold transform="uppercase" green>{data.id_screening}</Text>
                    </Card>
                    <View style={styles.btnTab}>
                        <Button 
                            style={[{flex:0.49}, active=='1' ? styles.btnActive : styles.btnInActive]}
                            onPress={()=> {
                                setActive('1')
                                setData({...data, jenis_identitas:"ktp"})
                            }}
                        >
                            <Text font bold transform="uppercase" style={{color: active == '1' ? colors.white : colors.orange}}>KTP</Text>
                        </Button>
                        <Button 
                            style={[{flex:0.49}, active=='2' ? styles.btnActive : styles.btnInActive]}
                            onPress={()=> setActive('2')}
                        >
                            <Text font bold transform="uppercase" style={{color: active == '2' ? colors.white : colors.orange}}>NON KTP</Text>
                        </Button>
                    </View>

                    {active == '1' ? renderFormKtp() : renderFormNonKtp() }

                    <Modal header={modal.header}
                        visible={modal.visible}
                        onRequestClose = {closeModal}
                    >
                        <Text>{modal.message}</Text>
                        <Button style={{width:'50%', backgroundColor:colors.blue}}
                            onPress={closeModal}
                        >
                            <Text font transform="uppercase" white>ok</Text>
                        </Button>
                    </Modal>
                </SafeAreaView>
            </ScrollView>
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        padding:sizes.base,
        backgroundColor:colors.white,
        minHeight:height
    },
    btnTab:{
        width:'100%',
        paddingVertical:sizes.base-6,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    btnSearch:{
        backgroundColor:colors.blue,
        padding:15,
        marginLeft:5
    },
    btnInActive:{
        borderWidth:2, 
        borderColor:colors.orange
    },
    btnActive:{
        backgroundColor:colors.orange,
        borderWidth:0
    },
    card:{
        height:height/8,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    formSearch:{
        flex:0.1,
        flexDirection:'row',
        paddingVertical:15
    },
    form:{
        flex:1,
        width:'100%'
    },
    input:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#ccc',
        backgroundColor:'white',
        padding:10,
    },
    picker:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#ccc',
        backgroundColor:'white',
        height:50,
        marginVertical:5
    }
})

export default ScreeningProcess;
