<template>
<el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="酒店名称"
      width="65"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="设备数量">
      <template slot-scope="scope">
        <span>{{ scope.row.deviceCount }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="转换数量">
      <template slot-scope="scope">
        <span>{{ scope.row.converCount }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="转换率">
      <template slot-scope="scope">
        <span>{{ scope.row.converPer }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="日均使用次数">
      <template slot-scope="scope">
        <span>{{ scope.row.recordPer }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="日均使用时长">
      <template slot-scope="scope">
        <span>{{ scope.row.recordCount }}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="详情">
      <template slot-scope="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchAllCountByProvinceList } from '@/api/article'
import moment from 'moment'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      const start = moment().subtract(this.type, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')
      let end = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      if (this.type === '1') {
        end = moment().subtract(1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
      this.listQuery.start = start
      this.listQuery.end = end
      this.listQuery.province = '北京市'
      fetchAllCountByProvinceList(this.listQuery).then(response => {
        this.list = response.rows
        this.loading = false
      })
    }
  }
}
</script>

