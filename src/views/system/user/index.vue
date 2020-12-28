<template>
    <div>
        <page-header-wrapper></page-header-wrapper>
        <div style="margin-top: 40px;">
            <a-row>
                <a-col :span='5'><a-input-search placeholder="输入部门名称搜索" style="width: 200px" /></a-col>
                <a-col :span='5'><a-input placeholder="输入名称或者邮箱搜索" style="width: 200px" /></a-col>
                <a-col :span='5'><a-range-picker @change="onChange" /></a-col>
                <a-col :span='5'>
                    <a-select
                        show-search
                        placeholder="状态"
                        option-filter-prop="children"
                        style="width: 200px;margin-left: 40px;"
                        :filter-option="filterOption"
                        @change="handleChange"
                    >
                        <a-select-option value='1'>激活</a-select-option>
                        <a-select-option value='2'>锁定</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span='3'>
                    <a-button icon="search" type="primary">
                        Search
                    </a-button>
                    <a-button icon="reset" type="primary" style="float: right;">
                        重置
                    </a-button>
                </a-col>    
            </a-row>
            <a-row>
                <a-col :span='4'>
                    <a-tree 
                        :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent"
                        :tree-data="gData"
                        @expand="onExpand"
                    >
                    <template slot="title" slot-scope="{ title }">
                        <span v-if="title.indexOf(searchValue) > -1">
                            {{ title.substr(0, title.indexOf(searchValue)) }}
                            <span>{{searchValue}}</span>
                            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                        </span>
                        <span v-else>{{title}}</span>
                    </template>
                    </a-tree>
                </a-col>
                <a-col :span='20'>

                </a-col>
            </a-row>

        </div>
    </div>
</template>

<script>
const x = 3;
const y = 2;
const z = 1;
const gData = [];
const generateData = ( _level, _preKey, _tns ) => {
    const preKey = _preKey || '0'
    console.log(_tns)
    const tns = [];
    const children = [];
    for(let i = 0; i < x; i++){
        const key = `${preKey} - ${i}`
        tns.push({title:key, key, scopedSlots: { title: 'title' }})
        if(i < y){
            children.push(key)
        }
        
    }
    if(_level < 0){
        return tns
        }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index], children)
    })
}
generateData(z)
const dataList = []
const generateList = data => {
    for(let i = 0; i < data.length; i++){
        const node = data[i]
        const key = node.key;
        dataList.push({key, title:key})
        if(node.children){
            generateList(node.children)
        }
    }
}
generateList(gData)
const getParentKey = (key, tree) => {
    let parentKey;
    for(let i = 0; i < tree.length; i++){
        const node = tree[i]
        if(node.children){
            if(node.children.some(item => item.key === key)){
                parentKey = node.key
            }else if(getParentKey(key, node.children)){
                parentKey = getParentKey(key,node.children)
            }
        }
    }
    return parentKey
}

export default {
    data(){
        return {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            gData,
        }
    },
    methods: {
        onChange(date, dateString) {//日期选择
            console.log(date, dateString);
        },
        handleChange(value) {//状态选择
            console.log(`selected ${value}`);
        },
         onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
    }
}
</script>

<style scoped>

</style>