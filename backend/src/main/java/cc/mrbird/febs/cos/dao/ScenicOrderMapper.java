package cc.mrbird.febs.cos.dao;

import cc.mrbird.febs.cos.entity.OrderInfo;
import cc.mrbird.febs.cos.entity.ScenicOrder;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
public interface ScenicOrderMapper extends BaseMapper<ScenicOrder> {

    /**
     * 分页查询景点订单
     *
     * @param page        分页对象
     * @param scenicOrder 订单对象
     * @return 结果
     */
    IPage<LinkedHashMap<String, Object>> scenicInfoByPage(Page page, @Param("scenicOrder") ScenicOrder scenicOrder);

    /**
     * 获取用户订单信息
     *
     * @param userId 用户ID
     * @return 结果
     */
    List<LinkedHashMap<String, Object>> getScenicOrderByUserId(@Param("userId") Integer userId);

    /**
     * 查询订单详情
     *
     * @param orderId 订单ID
     * @return 结果
     */
    LinkedHashMap<String, Object> queryScenicOrderDetail(@Param("orderId") Integer orderId);

    /**
     * 本月订单信息
     *
     * @return 结果
     */
    List<ScenicOrder> selectOrderByMonth();

    /**
     * 本年订单信息
     *
     * @return 结果
     */
    List<ScenicOrder> selectOrderByYear();

    /**
     * 十天内订单数量统计
     *
     * @return 结果
     */
    List<LinkedHashMap<String, Object>> selectOrderNumWithinDays();

    /**
     * 十天内订单收益统计
     *
     * @return 结果
     */
    List<LinkedHashMap<String, Object>> selectOrderPriceWithinDays();
}
