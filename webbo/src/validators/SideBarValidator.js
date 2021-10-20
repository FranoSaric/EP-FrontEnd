import { menu } from "../components/sidebar/SideBarData";
import ClaimValueArray from "./ClaimValueArray";

export let validatedSideBar = [];

let claimValueArray=[]
let isValidated=false;

export const SideBarValidator = () => {
    // ako je vec validiran ne mora se validirat opet
    if(!isValidated){
        validatedSideBar = menu;
        
        //formatiranje grupiranih claimova u obični niz
        claimValueArray=ClaimValueArray();
        
        validatedSideBar=filterData(validatedSideBar);
        
        isValidated=true;
    }
};

const filterData=(menuItems)=>{
    let filteredMenu=menuItems.filter((item)=>{
        if(validate(item)){
            if(item.items){
                item.items=filterData(item.items);
            }
            return item;
        }
    })
    return filteredMenu;
}

const validate=(item)=>{
    if(item.claim===""){
        return true;
    }
    for(let i=0; i<claimValueArray.length;i++){
        if(item.claim===claimValueArray[i]){
            return true;
        }
    }
    if(item.items ){
        if(item.items.length>0){
            for(let i=0;i<item.items.length;i++){
                if(validate(item.items[i])){
                    return true;
                }
                
            }
            return false;
        }else{
            return false;
        }
    }else{
        return false;
    }
    
}