<template>
    <div>
        <page-header-wrapper></page-header-wrapper>
        <div style="margin-top: 40px;">
            <a-row>
                <a-col :span='4'><a-input-search placeholder="输入部门名称搜索" style="width: 80%" /></a-col>
                <a-col :span='4'><a-input placeholder="输入名称或者邮箱搜索" style="width: 80%" /></a-col>
                <a-col :span='4'><a-range-picker @change="onChange" /></a-col>
                <a-col :span='4'>
                    <a-select
                        show-search
                        placeholder="状态"
                        option-filter-prop="children"
                        style="width: 80%;margin-left: 40px;"
                        @change="handleChange"
                    >
                        <a-select-option value='1'>激活</a-select-option>
                        <a-select-option value='2'>锁定</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span='8' style="padding-left: 2%;">
                    <a-button icon="search" type="primary">
                        Search
                    </a-button>
                    <a-button icon="reset" type="primary" style="margin-left: 2%;">
                        重置
                    </a-button>
                </a-col>    
            </a-row>
            <a-row>
                <a-col :span='4'>
                    <a-tree :load-data="onLoadData" :tree-data="treeData" />
                </a-col>
                <a-col :span='20'>

                </a-col>
            </a-row>

        </div>
    </div>
</template>

<script>
import { deptList } from '../../../api/service'
export default {
    data(){
        return {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            treeData: [],
            pid:''
        }
    },
    created(){
        this.getDeptList(this.pid)
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
          changeTree(selectedKeys){
              this.pid = selectedKeys
              this.getDeptList(selectedKeys.id)
          },

        onLoadData(treeNode) {
            return new Promise(resolve => {
                console.log(treeNode.dataRef)
                if (treeNode.dataRef.children) {
                resolve();
                return;
                }
                treeNode.dataRef.children = [
                { title: 'Child Node', key: `${treeNode.eventKey}-0` },
                { title: 'Child Node', key: `${treeNode.eventKey}-1` },
                ];
                this.treeData = [...this.treeData];
                resolve();
            });
            },
        async getDeptList(pid){
            const { content } = await deptList(pid)
            let customColumns = [];
            content.map((item,index) => {
                var obj = {
                    title: item.name,
                    id: item.id,
                    isLeaf: item.leaf
                }
                customColumns.push(obj)
            })
            this.treeData = customColumns
        }
    }
}
</script>

<style scoped>

</style>